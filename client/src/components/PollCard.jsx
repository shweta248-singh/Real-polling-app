// import { socket } from "/socket";
// import { useState,useEffect } from 'react';
// import { CheckCircle2, Clock, Trash2 } from 'lucide-react';



// const PollCard = ({ poll, userVote, onVote, onDelete, isAdmin }) => {
//   const [loadingIndex, setLoadingIndex] = useState(null);

//   const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
//   const isExpired = poll.status === 'expired';
//   const hasVoted = userVote !== null;
//   const showResults = hasVoted || isExpired || isAdmin;

//   const handleVoteClick = async (index) => {
//     if (showResults || loadingIndex !== null) return;
//     setLoadingIndex(index);
//     try {
//       await onVote(poll._id, index);
//     } finally {
//       setLoadingIndex(null);
//     }
//   };

//   useEffect(() => {

//   socket.on("pollCreated", (newPoll) => {
//     console.log("New Poll:", newPoll);
//   });

//   socket.on("pollUpdated", (updatedPoll) => {
//     console.log("Updated Poll:", updatedPoll);
//   });

//   socket.on("pollDeleted", (id) => {
//     console.log("Deleted Poll:", id);
//   });

//   return () => {
//     socket.off("pollCreated");
//     socket.off("pollUpdated");
//     socket.off("pollDeleted");
//   };

// }, []);


//   return (
//     <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative group w-[70%] mx-auto h-[350px] overflow-auto">
//       {isAdmin && (
//         <button 
//           onClick={() => onDelete(poll._id)}
//           className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
//           title="Delete Poll"
//         >
//           <Trash2 className="w-5 h-5"/>
//         </button>
//       )}
      
//       <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 pr-8 leading-snug">{poll.question}</h3>
      
//       <div className="space-y-4 mb-8">
//         {poll.options.map((option, idx) => {
//           const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
//           const isSelected = userVote === idx;

//           return (
//             <div key={idx} className="relative group/option">
//               {!showResults ? (
//                 <button
//                   onClick={() => handleVoteClick(idx)}
//                   className={`w-full text-left px-5 py-4 border-2 rounded-2xl transition-all duration-200 ${
//                     loadingIndex === idx ? 'opacity-50 cursor-not-allowed scale-[0.99]' : 'hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border-slate-100 bg-white'
//                   }`}
//                 >
//                   <span className="font-semibold text-slate-700">{option.text}</span>
//                 </button>
//               ) : (
//                 <div className={`relative w-full border-2 rounded-2xl overflow-hidden transition-all duration-300 ${isSelected ? 'border-indigo-100 bg-indigo-50/30' : 'border-slate-100 bg-slate-50/50'}`}>
//                   <div 
//                     className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${isSelected ? 'bg-gradient-to-r from-indigo-100 to-indigo-200' : 'bg-slate-200'}`}
//                     style={{ width: `${percentage}%` }}
//                   ></div>
//                   <div className="relative px-5 py-4 flex justify-between items-center">
//                     <span className={`font-semibold flex items-center z-10 ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>
//                       {option.text}
//                       {isSelected && <CheckCircle2 className="w-5 h-5 ml-2 text-indigo-500 animate-fade-in" />}
//                     </span>
//                     <span className={`font-bold z-10 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
//                       {percentage}% <span className="text-xs font-medium ml-1 opacity-70">({option.votes})</span>
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-between items-center text-sm font-medium border-t border-slate-100 pt-5">
//         <span className="text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{totalVotes} {totalVotes === 1 ? 'Vote' : 'Votes'}</span>
//         <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full shadow-sm ${isExpired ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
//           <Clock className="w-4 h-4" />
//           <span>{isExpired ? 'Expired' : 'Active'}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PollCard;


import { socket } from "/socket";
import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Trash2, 
  BarChart2, 
  Users,
  Sparkles
} from 'lucide-react';

const PollCard = ({ poll, userVote, onVote, onDelete, isAdmin }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  const isExpired = poll.status === 'expired';
  const hasVoted = userVote !== null;
  // const showResults = hasVoted || isExpired || isAdmin;
  const showResults = isExpired || isAdmin;


  const handleVoteClick = async (index) => {
    // if (showResults || loadingIndex !== null) return;
    if (isExpired || loadingIndex !== null) return;

    setLoadingIndex(index);
    try {
      await onVote(poll._id, index);
    } finally {
      setLoadingIndex(null);
    }
  };

  useEffect(() => {
    socket.on("pollCreated", (newPoll) => {
      console.log("New Poll:", newPoll);
    });

    socket.on("pollUpdated", (updatedPoll) => {
      console.log("Updated Poll:", updatedPoll);
    });

    socket.on("pollDeleted", (id) => {
      console.log("Deleted Poll:", id);
    });

    return () => {
      socket.off("pollCreated");
      socket.off("pollUpdated");
      socket.off("pollDeleted");
    };
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-200/60 hover:shadow-2xl transition-all duration-300 relative group w-[70%] mx-auto ">

      {/* 🔥 Admin Delete */}
      {isAdmin && (
        <button
          onClick={() => onDelete(poll._id)}
          className="absolute top-5 right-5 bg-white/70 backdrop-blur-md p-2 rounded-xl shadow-sm text-slate-400 hover:text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      {/* 🔥 Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          {poll.question}
        </h3>

        <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
          isExpired 
            ? 'bg-red-100 text-red-600' 
            : 'bg-emerald-100 text-emerald-600'
        }`}>
          <Clock className="w-3 h-3" />
          {isExpired ? 'Expired' : 'Active'}
        </span>
      </div>

      {/* 🔥 Options */}
      <div className="space-y-4 mb-6">
        {poll.options.map((option, idx) => {
          const percentage = totalVotes > 0 
            ? Math.round((option.votes / totalVotes) * 100) 
            : 0;

          const isSelected = userVote === idx;

          return (
            // <div key={idx}>
            //   {!showResults ? (
            //     <button
            //       onClick={() => handleVoteClick(idx)}
            //       className={`w-full text-left px-5 py-4 border rounded-2xl transition-all duration-200 ${
            //         loadingIndex === idx
            //           ? 'opacity-50 cursor-not-allowed'
            //           : 'hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md hover:-translate-y-0.5 border-slate-200 bg-white'
            //       }`}
            //     >
            //       <span className="font-semibold text-slate-700">
            //         {option.text}
            //       </span>
            //     </button>
            //   ) : (
            //     <div className={`relative w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
            //       isSelected 
            //         ? 'border-indigo-200 bg-indigo-50/40' 
            //         : 'border-slate-200 bg-slate-50'
            //     }`}>

            //       {/* 🔥 Progress Bar */}
            //       <div
            //         className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
            //           isSelected
            //             ? 'bg-gradient-to-r from-indigo-400 to-sky-400 opacity-30'
            //             : 'bg-slate-300 opacity-30'
            //         }`}
            //         style={{ width: `${percentage}%` }}
            //       ></div>

            //       {/* Content */}
            //       <div className="relative px-5 py-4 flex justify-between items-center">
                    
            //         <span className={`font-semibold flex items-center gap-2 ${
            //           isSelected ? 'text-indigo-700' : 'text-slate-700'
            //         }`}>
            //           {option.text}

            //           {isSelected && (
            //             <CheckCircle2 className="w-5 h-5 text-indigo-500 animate-fade-in" />
            //           )}
            //         </span>

            //         <span className={`font-bold ${
            //           isSelected ? 'text-indigo-600' : 'text-slate-500'
            //         }`}>
            //           {percentage}% 
            //           <span className="text-xs ml-1 opacity-70">
            //             ({option.votes})
            //           </span>
            //         </span>

            //       </div>
            //     </div>
            //   )}
            // </div>

            <button
              key={idx}
              onClick={() => handleVoteClick(idx)}
              className={`w-full text-left px-5 py-4 border rounded-2xl transition-all duration-200 ${
                loadingIndex === idx
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md hover:-translate-y-0.5'
              } ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-100'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-center">

                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  {option.text}

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  )}
                </span>

                {/* 🔥 Live Result Always Visible */}
                <span className="font-bold text-slate-600">
                  {percentage}%
                  <span className="text-xs ml-1 opacity-70">
                    ({option.votes})
                  </span>
                </span>

              </div>
            </button>
          );
        })}
      </div>

      {/* 🔥 Footer */}
      <div className="flex justify-between items-center text-sm font-medium border-t border-slate-100 pt-4">

        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600 font-semibold">
            {totalVotes} {totalVotes === 1 ? 'Vote' : 'Votes'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-indigo-500 font-semibold">
          <BarChart2 className="w-4 h-4" />
          <span>Live Results</span>
        </div>

      </div>

    </div>
  );
};

export default PollCard;

