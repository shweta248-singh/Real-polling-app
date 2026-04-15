import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => navigate('/dashboard')}
            >
              PolyPoll
            </h1>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50/50 rounded-full border border-indigo-100">
              <UserIcon className="w-4 h-4 mr-2 text-indigo-500" />
              <span className="text-sm font-semibold text-slate-700 hidden sm:inline-block">
                {user?.name}
              </span>
              {user?.role === 'admin' && (
                <span className="ml-2 text-[10px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </div>
            <button 
              onClick={handleLogout}
              title="Logout"
              className="flex items-center p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
