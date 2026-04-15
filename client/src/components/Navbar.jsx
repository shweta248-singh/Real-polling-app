// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { LogOut, User as UserIcon } from 'lucide-react';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <h1 
//               className="text-2xl font-extrabold text-transparent bg-clip-text @apply bg-gradient-to-r from-indigo-500 to-sky-400 tracking-tight cursor-pointer hover:opacity-80 transition-opacity" 
//               onClick={() => navigate('/dashboard')}
//             >
//               PolyPoll
//             </h1>
//           </div>
//           <div className="flex items-center space-x-4 sm:space-x-6">
//             <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50/50 rounded-full border border-indigo-100">
//               <UserIcon className="w-4 h-4 mr-2 text-indigo-500" />
//               <span className="text-sm font-semibold text-slate-700 hidden sm:inline-block">
//                 {user?.name}
//               </span>
//               {user?.role === 'admin' && (
//                 <span className="ml-2 text-[10px] uppercase tracking-wider font-bold bg-indigo-100 @apply bg-gradient-to-r from-indigo-500 to-sky-400 px-2 py-0.5 rounded-full">
//                   Admin
//                 </span>
//               )}
//             </div>
//             <button 
//               onClick={handleLogout}
//               title="Logout"
//               className="flex items-center p-2 @apply bg-gradient-to-r from-indigo-500 to-sky-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { 
  LogOut, 
  User as UserIcon, 
  Bell, 
  Sparkles 
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16 items-center">

          {/* 🔥 Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/dashboard')}
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-xl shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400 tracking-tight group-hover:opacity-80 transition">
              PolyPoll
            </h1>
          </div>

          {/* 🔥 Right Section */}
          <div className="flex items-center gap-4">

            {/* 🔔 Notification Icon (future use) */}
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* 👤 User Info */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm">

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* Name */}
              <span className="text-sm font-semibold text-slate-700 hidden sm:block">
                {user?.name}
              </span>

              {/* Admin Badge */}
              {user?.role === 'admin' && (
                <span className="text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r from-indigo-500 to-sky-400 text-white px-2 py-0.5 rounded-full shadow-sm">
                  Admin
                </span>
              )}
            </div>

            {/* 🚪 Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-500 transition-all group"
            >
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-semibold hidden sm:inline">
                Logout
              </span>
            </button>

          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

