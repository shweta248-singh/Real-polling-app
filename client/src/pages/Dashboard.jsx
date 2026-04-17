// import { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { SocketContext } from '../contexts/SocketContext';
// import api from '../api/axios';
// import Navbar from '../components/Navbar';
// import PollCard from '../components/PollCard';
// import CreatePollForm from '../components/CreatePollForm';

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const socket = useContext(SocketContext);
//   const [polls, setPolls] = useState([]);
//   const [myVotes, setMyVotes] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Fetch initial data
//   const fetchData = async () => {
//     try {
//       const [pollsRes, votesRes] = await Promise.all([
//         api.get('/polls'),
//         api.get('/polls/myvotes/all')
//       ]);
//       setPolls(pollsRes.data);
      
//       const votesMap = {};
//       votesRes.data.forEach(v => {
//         votesMap[v.poll] = v.optionIndex;
//       });
//       setMyVotes(votesMap);
//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Configure Socket.IO listeners
//   useEffect(() => {
//     if (!socket) return;

//     const handleVoteUpdate = ({ pollId, optionIndex, votes }) => {
//       setPolls(current => current.map(p => {
//         if (p._id === pollId) {
//           const newOptions = [...p.options];
//           newOptions[optionIndex].votes = votes;
//           return { ...p, options: newOptions };
//         }
//         return p;
//       }));
//     };

//     const handlePollCreated = (newPoll) => {
//       setPolls(current => [newPoll, ...current]);
//     };

//     const handlePollDeleted = (pollId) => {
//       setPolls(current => current.filter(p => p._id !== pollId));
//     };

//     const handlePollsExpired = () => {
//       fetchData(); // Simplest way to resync status is to refetch all
//     };

//     socket.on('voteUpdate', handleVoteUpdate);
//     socket.on('pollCreated', handlePollCreated);
//     socket.on('pollDeleted', handlePollDeleted);
//     socket.on('pollsExpired', handlePollsExpired);

//     return () => {
//       socket.off('voteUpdate', handleVoteUpdate);
//       socket.off('pollCreated', handlePollCreated);
//       socket.off('pollDeleted', handlePollDeleted);
//       socket.off('pollsExpired', handlePollsExpired);
//     };
//   }, [socket]);

//   const handleVote = async (pollId, optionIndex) => {
//     try {
//       await api.post(`/polls/${pollId}/vote`, { optionIndex });
//       setMyVotes(prev => ({ ...prev, [pollId]: optionIndex }));
//     } catch (error) {
//       alert(error.response?.data?.message || 'Vote failed');
//     }
//   };

//   const handleDelete = async (pollId) => {
//     if (!window.confirm('Are you sure you want to delete this poll?')) return;
//     try {
//       await api.delete(`/polls/${pollId}`);
//     } catch (error) {
//       alert('Failed to delete poll');
//     }
//   };

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-xl font-medium text-slate-500">Loading Dashboard...</div>;
//   }

//   return (
//     <div className="min-h-screen text-slate-800 animate-fade-in">
//       <Navbar />
      
//       <main className="max-w-4xl mx-auto px-4 py-10">
//         {user?.role === 'admin' && (
//           <CreatePollForm onPollCreated={() => {}} />
//         )}

//         <div className="space-y-8">
          
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-2xl font-extrabold ml-20 text-slate-300">
//               {polls.length === 0 ? 'No Active Polls' : 'Live Polls'}
//             </h2>
//             {polls.length > 0 && (
//               <span className="px-3 mr-20 py-1 bg-emerald-100 text-emerald-700 shadow-sm text-sm font-bold rounded-full animate-pulse-slow">
//                 {polls.length} Active
//               </span>
//             )}
//           </div>
          
//           <div className="grid gap-6">
            
            
            
//             {polls.map((poll, index) => (
//               <div key={poll._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                
                
//                 <PollCard 
                

               
//                   poll={poll} 
//                   userVote={myVotes[poll._id] ?? null}
//                   onVote={handleVote}
//                   onDelete={handleDelete}
//                   isAdmin={user?.role === 'admin'}
//                 />
                
//               </div>
//             ))}
//             {polls.length === 0 && (
              
//               <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-sm">
//                 <span className="text-slate-700 text-lg font-bold">There are no active polls right now. Check back later!</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { SocketContext } from '../contexts/SocketContext';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import PollCard from '../components/PollCard';
import CreatePollForm from '../components/CreatePollForm';

import { 
  Loader2, 
  BarChart3, 
  Activity, 
  Inbox, 
  Sparkles 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [polls, setPolls] = useState([]);
  const [myVotes, setMyVotes] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [pollsRes, votesRes] = await Promise.all([
        api.get('/api/polls'),
        api.get('/api/polls/myvotes/all')
      ]);

      setPolls(pollsRes.data);

      const votesMap = {};
      votesRes.data.forEach(v => {
        votesMap[v.poll] = v.optionIndex;
      });

      setMyVotes(votesMap);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // const handleVoteUpdate = ({ pollId, optionIndex, votes }) => {
    //   setPolls(current =>
    //     current.map(p => {
    //       if (p._id === pollId) {
    //         const newOptions = [...p.options];
    //         newOptions[optionIndex].votes = votes;
    //         return { ...p, options: newOptions };
    //       }
    //       return p;
    //     })
    //   );
    // };

    const handlePollUpdated = (updatedPoll) => {
      setPolls((current) =>
        current.map((p) =>
          p._id === updatedPoll._id ? updatedPoll : p
        )
      );
    };

    const handlePollCreated = (newPoll) => {
      setPolls(current => [newPoll, ...current]);
    };

    const handlePollDeleted = (pollId) => {
      setPolls(current => current.filter(p => p._id !== pollId));
    };

    const handlePollsExpired = () => {
      fetchData();
    };

    socket.on('pollUpdated', handlePollUpdated);
    socket.on('pollCreated', handlePollCreated);
    socket.on('pollDeleted', handlePollDeleted);
    socket.on('pollsExpired', handlePollsExpired);

    return () => {
      socket.off('pollUpdated', handlePollUpdated);
      socket.off('pollCreated', handlePollCreated);
      socket.off('pollDeleted', handlePollDeleted);
      socket.off('pollsExpired', handlePollsExpired);
    };
  }, [socket]);

  // const handleVote = async (pollId, optionIndex) => {
  //   try {
  //     await api.post(`/api/polls/${pollId}/vote`, { optionIndex });
  //     setMyVotes(prev => ({ ...prev, [pollId]: optionIndex }));
  //   } catch (error) {
  //     alert(error.response?.data?.message || 'Vote failed');
  //   }
  // };


  const handleVote = async (pollId, optionIndex) => {
    try {
      const res = await api.post(`/api/polls/${pollId}/vote`, {
        optionIndex
      });

      // 🔥 instant UI update (NO REFRESH NEEDED)
      setPolls((prev) =>
        prev.map((p) =>
          p._id === res.data.poll._id ? res.data.poll : p
        )
      );

      setMyVotes(prev => ({
        ...prev,
        [pollId]: optionIndex
      }));

    } catch (error) {
      alert(error.response?.data?.message || 'Vote failed');
    }
  };

  const handleDelete = async (pollId) => {
    if (!window.confirm('Are you sure you want to delete this poll?')) return;
    try {
      await api.delete(`/api/polls/${pollId}`);
    } catch (error) {
      alert('Failed to delete poll');
    }
  };

  // 🔄 Loading Screen (Improved)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <p className="text-lg font-semibold">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800  bg-gradient-to-r from-indigo-400 via-white to-sky-400 animate-fade-in bg-transparent ">
      
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">

        {/* 🔥 Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400">
            <Sparkles className="w-7 h-7 text-indigo-500" />
            Dashboard
          </h1>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <span className="font-bold">{polls.length}</span>
              <span className="text-sm text-slate-500">Polls</span>
            </div>

            <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-xl shadow-sm">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-emerald-700">Active</span>
            </div>
          </div>
        </div>

        {/* Admin Create Poll */}
        {user?.role === 'admin' && (
          <CreatePollForm onPollCreated={() => {}} />
        )}

        {/* 🔥 Poll Section */}
        <div className="space-y-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl ml-20 font-bold text-slate-700">
              {polls.length === 0 ? 'No Active Polls' : 'Live Polls'}
            </h2>

            {polls.length > 0 && (
              <span className="px-3 py-1 mr-20 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full animate-pulse">
                {polls.length} Active
              </span>
            )}
          </div>

          {/* Poll List */}
          <div className="grid gap-6">
            {polls.map((poll, index) => (
              <div
                key={poll._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PollCard
                  poll={poll}
                  userVote={myVotes[poll._id] ?? null}
                  onVote={handleVote}
                  onDelete={handleDelete}
                  isAdmin={user?.role === 'admin'}
                />
              </div>
            ))}

            {/* ✨ Empty State */}
            {polls.length === 0 && (
              <div className="text-center py-20 bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center gap-4">
                
                <Inbox className="w-12 h-12 text-slate-400" />

                <h3 className="text-lg font-bold text-slate-700">
                  No polls available
                </h3>

                <p className="text-sm text-slate-500">
                  There are no active polls right now. Please check back later.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;

