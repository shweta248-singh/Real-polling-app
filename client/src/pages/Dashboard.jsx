import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { SocketContext } from '../contexts/SocketContext';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import PollCard from '../components/PollCard';
import CreatePollForm from '../components/CreatePollForm';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [polls, setPolls] = useState([]);
  const [myVotes, setMyVotes] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [pollsRes, votesRes] = await Promise.all([
        api.get('/polls'),
        api.get('/polls/myvotes/all')
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

  // Configure Socket.IO listeners
  useEffect(() => {
    if (!socket) return;

    const handleVoteUpdate = ({ pollId, optionIndex, votes }) => {
      setPolls(current => current.map(p => {
        if (p._id === pollId) {
          const newOptions = [...p.options];
          newOptions[optionIndex].votes = votes;
          return { ...p, options: newOptions };
        }
        return p;
      }));
    };

    const handlePollCreated = (newPoll) => {
      setPolls(current => [newPoll, ...current]);
    };

    const handlePollDeleted = (pollId) => {
      setPolls(current => current.filter(p => p._id !== pollId));
    };

    const handlePollsExpired = () => {
      fetchData(); // Simplest way to resync status is to refetch all
    };

    socket.on('voteUpdate', handleVoteUpdate);
    socket.on('pollCreated', handlePollCreated);
    socket.on('pollDeleted', handlePollDeleted);
    socket.on('pollsExpired', handlePollsExpired);

    return () => {
      socket.off('voteUpdate', handleVoteUpdate);
      socket.off('pollCreated', handlePollCreated);
      socket.off('pollDeleted', handlePollDeleted);
      socket.off('pollsExpired', handlePollsExpired);
    };
  }, [socket]);

  const handleVote = async (pollId, optionIndex) => {
    try {
      await api.post(`/polls/${pollId}/vote`, { optionIndex });
      setMyVotes(prev => ({ ...prev, [pollId]: optionIndex }));
    } catch (error) {
      alert(error.response?.data?.message || 'Vote failed');
    }
  };

  const handleDelete = async (pollId) => {
    if (!window.confirm('Are you sure you want to delete this poll?')) return;
    try {
      await api.delete(`/polls/${pollId}`);
    } catch (error) {
      alert('Failed to delete poll');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-medium text-slate-500">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen text-slate-800 animate-fade-in">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-10">
        {user?.role === 'admin' && (
          <CreatePollForm onPollCreated={() => {}} />
        )}

        <div className="space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {polls.length === 0 ? 'No Active Polls' : 'Live Polls'}
            </h2>
            {polls.length > 0 && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 shadow-sm text-sm font-bold rounded-full animate-pulse-slow">
                {polls.length} Active
              </span>
            )}
          </div>
          
          <div className="grid gap-6">
            {polls.map((poll, index) => (
              <div key={poll._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <PollCard 
                  poll={poll} 
                  userVote={myVotes[poll._id] ?? null}
                  onVote={handleVote}
                  onDelete={handleDelete}
                  isAdmin={user?.role === 'admin'}
                />
              </div>
            ))}
            {polls.length === 0 && (
              <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-sm">
                <span className="text-slate-500 text-lg font-medium">There are no active polls right now. Check back later!</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
