// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cron from 'node-cron';
// import Poll from './models/Poll.js';

// import authRoutes from './routes/authRoutes.js';
// import pollRoutes from './routes/pollRoutes.js';
// //..........................................
// dotenv.config();
// require("dotenv").config();


// const app = express();
// const server = http.createServer(app);

// // CORS config
// const corsOptions = {
//   origin: '*', // For development. Change to specific frontend url in production.
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//    credentials: true
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// // Socket.IO config
// const io = new Server(server, {
//   cors: corsOptions
// });

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);
//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });

// // Middleware to attach io to req
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/polls', pollRoutes);

// // MongoDB Connection
// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/polling-app';

// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// // Cron Job: Check for expired polls every minute
// cron.schedule('* * * * *', async () => {
//   try {
//     const now = new Date();
//     const result = await Poll.updateMany(
//       { status: 'active', expiresAt: { $lte: now } },
//       { $set: { status: 'expired' } }
//     );
//     if (result.modifiedCount > 0) {
//       console.log(`${result.modifiedCount} poll(s) marked as expired.`);
//       io.emit('pollsExpired'); // Tell clients to refetch or update state
//     }
//   } catch (error) {
//     console.error('Cron job error:', error);
//   }
// });

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import Poll from './models/Poll.js';

import authRoutes from './routes/authRoutes.js';
import pollRoutes from './routes/pollRoutes.js';

// 🔥 LOAD ENV (only once)
dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ CORS CONFIG (Production ready)
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// 🔥 SOCKET.IO SETUP
const io = new Server(server, {
  cors: corsOptions
});

// ✅ SOCKET CONNECTION
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  // OPTIONAL: Join poll room (future scaling)
  socket.on("joinPoll", (pollId) => {
    socket.join(pollId);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// 🔥 IMPORTANT: attach io to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);

// ✅ HEALTH CHECK ROUTE (important for Render)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 MONGODB CONNECTION (Atlas + Local support)
const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI || // Atlas
  process.env.MONGODB_URI || // fallback
  'mongodb://127.0.0.1:27017/polling-app'; // local

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// 🔥 CRON JOB: Poll expiry
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();

    const expiredPolls = await Poll.find({
      status: 'active',
      expiresAt: { $lte: now }
    });

    if (expiredPolls.length > 0) {

      await Poll.updateMany(
        { _id: { $in: expiredPolls.map(p => p._id) } },
        { $set: { status: 'expired' } }
      );

      console.log(`⏰ ${expiredPolls.length} poll(s) expired`);

      // 🔥 REAL-TIME EMIT
      expiredPolls.forEach(poll => {
        io.emit('pollExpired', poll._id);
      });
    }

  } catch (error) {
    console.error('❌ Cron job error:', error);
  }
});



