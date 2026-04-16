// import { useState } from 'react';
// import { PlusCircle, MinusCircle, Loader2 } from 'lucide-react';
// import api from '../api/axios';

// const CreatePollForm = ({ onPollCreated }) => {
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState(['', '']);
//   const [durationMinutes, setDurationMinutes] = useState(1440); // 24h default
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleAddOption = () => setOptions([...options, '']);
  
//   const handleRemoveOption = (index) => {
//     if (options.length > 2) {
//       setOptions(options.filter((_, i) => i !== index));
//     }
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validOptions = options.filter(opt => opt.trim() !== '');
    
//     if (validOptions.length < 2) {
//       setError('Please provide at least 2 valid options.');
//       return;
//     }

//     setLoading(true);
//     setError('');
    
//     try {
//       const { data } = await api.post('/polls', {
//         question,
//         options: validOptions,
//         durationMinutes
//       });
//       setQuestion('');
//       setOptions(['', '']);
//       onPollCreated(data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create poll');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 mb-10 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-[70%] mx-auto h-auto">
//       <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center text-transparent bg-clip-text @apply bg-gradient-to-r from-indigo-500 to-sky-400 tracking-tight">
//         <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl mr-3">
//           <PlusCircle className="w-5 h-5" />
//         </span>
//         Create New Poll
//       </h2>
//       {error && (
//         <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium animate-fade-in">
//           {error}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit} className="space-y-2">
//         <div>
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Question</label>
//           <input 
//             type="text" 
//             required 
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="e.g., What should be our next team building activity?"
//             className="w-full px-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
//           />
//         </div>

//         <div className="space-y-1">
//           <label className="block text-sm font-semibold text-slate-700 mb-2">Options</label>
//           <div className="space-y-3 animate-fade-in">
//             {options.map((opt, idx) => (
//               <div key={idx} className="flex gap-3 group animate-fade-in-up">
//                 <input 
//                   type="text" 
//                   required 
//                   value={opt}
//                   onChange={(e) => handleOptionChange(idx, e.target.value)}
//                   placeholder={`Option ${idx + 1}`}
//                   className="flex-1 px-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium"
//                 />
//                 <button 
//                   type="button"
//                   onClick={() => handleRemoveOption(idx)}
//                   disabled={options.length <= 2}
//                   className="text-slate-300 hover:text-red-500 disabled:opacity-30 transition-all px-2 flex items-center justify-center opacity-50 group-hover:opacity-100"
//                 >
//                   <MinusCircle className="w-6 h-6" />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <button 
//             type="button" 
//             onClick={handleAddOption}
//             className="mt-2 flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
//           >
//             <PlusCircle className="w-4 h-4 mr-2" /> Add another option
//           </button>
//         </div>

//         <div className="pt-2 border-t border-slate-100">
//           <label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">Duration</label>
//           <select 
//             value={durationMinutes} 
//             onChange={(e) => setDurationMinutes(Number(e.target.value))}
//             className="w-full px-4 py-2.5 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold appearance-none cursor-pointer"
//           >
//             <option value={60}>1 Hour ⚡️</option>
//             <option value={1440}>24 Hours 🕐</option>
//             <option value={10080}>1 Week 📅</option>
//           </select>
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           className="w-full @apply bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
//         >
//           {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Poll'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePollForm;


import { useState } from 'react';
import { 
  PlusCircle, 
  MinusCircle, 
  Loader2, 
  HelpCircle, 
  ListChecks, 
  Clock,
  Sparkles
} from 'lucide-react';
import api from '../api/axios';

const CreatePollForm = ({ onPollCreated }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [durationMinutes, setDurationMinutes] = useState(1440);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddOption = () => setOptions([...options, '']);

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validOptions = options.filter(opt => opt.trim() !== '');

    if (validOptions.length < 2) {
      setError('Please provide at least 2 valid options.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/api/polls', {
        question,
        options: validOptions,
        durationMinutes
      });

      setQuestion('');
      setOptions(['', '']);
      onPollCreated(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create poll');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-slate-200/60 mb-10 w-[70%] mx-auto hover:shadow-2xl transition-all">

      {/* Header */}
      <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400">
        <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
          <Sparkles className="w-5 h-5" />
        </span>
        Create New Poll
      </h2>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Question */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            Question
          </label>

          <input
            type="text"
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What should be our next team activity?"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Options */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <ListChecks className="w-4 h-4 text-indigo-500" />
            Options
          </label>

          <p className="text-xs text-slate-400 mb-2">
            Minimum 2 options required
          </p>

          <div className="space-y-3">
            {options.map((opt, idx) => (
              <div key={idx} className="flex gap-3 group">
                <input
                  type="text"
                  required
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveOption(idx)}
                  disabled={options.length <= 2}
                  className="text-slate-300 hover:text-red-500 disabled:opacity-30 transition-all"
                >
                  <MinusCircle className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddOption}
            className="mt-3 flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-all"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Option
          </button>
        </div>

        {/* Duration */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            Duration
          </label>

          <select
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
          >
            <option value={60}>1 Hour ⚡</option>
            <option value={1440}>24 Hours 🕐</option>
            <option value={10080}>1 Week 📅</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-600 hover:to-violet-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Publish Poll
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default CreatePollForm;

