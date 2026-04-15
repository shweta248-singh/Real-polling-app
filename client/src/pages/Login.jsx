// import { useState, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return (
//     <div className='login'>
//     <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
//       {/* Background decorations */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/20 blur-[100px] pointer-events-none" />

//       <div className="w-full max-w-sm px-6 py-8 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10 animate-fade-in-up">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold  text-transparent bg-clip-text @apply bg-gradient-to-r from-indigo-500 to-sky-400 tracking-tight mb-2">
//             PolyPoll
//           </h1>
//           <h2 className="text-xl font-semibold text-slate-900 font-bold ">Welcome Back</h2>
//           <p className="text-sm text-slate-900 mt-1 text-bold">Please enter your details to log in</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl mb-6 text-sm text-center font-medium animate-fade-in">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Email</label>
//             <input 
//               type="email" 
//               required 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Password</label>
//             <input 
//               type="password" 
//               required 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
//               placeholder="••••••••"
//             />
//           </div>
//           <button 
//             type="submit" 
//             className="w-full @apply bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
//           >
//             Sign In
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-slate-700 font-bold">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
//             Create an account
//           </Link>
//         </p>
//       </div>
//     </div>
    
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    }
  };

 return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-r from-indigo-400 via-white to-sky-400
">
      
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/20 blur-[100px]" />

      {/* Card */}
      <div className="w-full max-w-sm px-6 py-8 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10 transition-all duration-300 hover:scale-[1.02]">

        {/* Logo/Icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl text-xl">
            📊
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400 tracking-tight mb-1">
            PolyPoll
          </h1>
          <h2 className="text-lg font-bold text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-900 mt-1">
            Real-time polling made simple & smart ⚡
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400">📧</span>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400">🔒</span>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400 hover:from-indigo-700 hover:to-violet-700 text-white py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-700 font-bold">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
            Create an account
          </Link>
        </p>

        {/* Trust text */}
        <p className="text-xs  text-bold text-slate-900 mt-3 text-center">
          Secure login • Real-time updates • Trusted by teams
        </p>
      </div>
    </div>
  );
};

export default Login;

