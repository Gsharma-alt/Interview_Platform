// import React, { useState, useEffect } from 'react';
// import { Video, MessageSquare, Users, Clock } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

// function Practice() {
//   const roles = [
//     'Software Engineer',
//     'Data Scientist',
//     'Product Manager',
//     'UX Designer',
//     'Marketing Manager',
//     'Sales Representative',
//   ];

//   const navigate = useNavigate();

//   const [selectedRole, setSelectedRole] = useState(() => {
//     const storedRole = localStorage.getItem('selectedRole');
//     return storedRole ? storedRole : '';
//   });

//   const [practiceStats, setPracticeStats] = useState(() => {
//     const storedStats = localStorage.getItem('practiceStats');
//     return storedStats ? JSON.parse(storedStats) : {
//       practiceTime: 0,
//       questionsAnswered: 0,
//       mockInterviews: 0,
//     };
//   });

//   useEffect(() => {
//     localStorage.setItem('selectedRole', selectedRole);
//   }, [selectedRole]);

//   useEffect(() => {
//     localStorage.setItem('practiceStats', JSON.stringify(practiceStats));
//   }, [practiceStats]);


//   const updateStats = (statType, value) => {
//     setPracticeStats(prevStats => ({ ...prevStats, [statType]: prevStats[statType] + value }));
//   };


//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//   };

//   const startInterview = (type) => {
//     if (type === 'video') {
//       navigate('/videoInterview')
//     } else if (type === 'text') {
//       navigate('/textinterview');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-8">
//           Choose Your Practice Mode
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

//           <div className="group">
//             <div className="relative p-1">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
//               <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
//                 <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
//                   <Video className="h-8 w-8 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-white mb-4">Video Interview</h2>
//                 <p className="text-purple-200 mb-6 flex-grow">
//                   Practice with our AI interviewer and get feedback on your body language, tone, and delivery.
//                 </p>
//                 <button
//                   className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//                   onClick={() => startInterview('video')}
//                 >
//                   Start Video Interview
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="group">
//             <div className="relative p-1">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
//               <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
//                 <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
//                   <MessageSquare className="h-8 w-8 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-white mb-4">Text-Based Interview</h2>
//                 <p className="text-purple-200 mb-6 flex-grow">
//                   Practice through text chat and focus on crafting well-structured responses.
//                 </p>
//                 <button
//                   className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//                   onClick={() => startInterview('text')}
//                 >
//                   Start Text Interview
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="relative p-1 mb-12">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
//           <div className="relative bg-indigo-950 rounded-xl p-8">
//             <h2 className="text-2xl font-semibold text-white mb-6">Practice for different Roles</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {roles.map((role) => (
//                 <button
//                   key={role}
//                   className={`p-4 border-2 rounded-lg transition-colors duration-300 
//                   ${selectedRole === role
//                       ? 'border-purple-400 bg-indigo-800 bg-opacity-50 text-purple-200'
//                       : 'border-indigo-700 hover:border-purple-400 hover:bg-indigo-800 hover:bg-opacity-30 text-purple-300'}`}
//                   onClick={() => handleRoleSelect(role)}
//                 >
//                   {role}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="relative p-1">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
//           <div className="relative bg-indigo-950 rounded-xl p-8">
//             <h2 className="text-2xl font-semibold text-white mb-6">Quick Stats</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
//                   <Clock className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-purple-300">Practice Time</p>
//                   <p className="text-xl font-semibold text-white">{practiceStats.practiceTime} hours</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
//                   <MessageSquare className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-purple-300">Questions Answered</p>
//                   <p className="text-xl font-semibold text-white">{practiceStats.questionsAnswered}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
//                   <Users className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-purple-300">Mock Interviews</p>
//                   <p className="text-xl font-semibold text-white">{practiceStats.mockInterviews}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Practice;


import React, { useState, useEffect } from 'react';
import { Video, MessageSquare, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Practice() {
  const roles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Marketing Manager',
    'Sales Representative',
  ];

  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(() => {
    const storedRole = localStorage.getItem('selectedRole');
    return storedRole ? storedRole : '';
  });

  const [practiceStats, setPracticeStats] = useState(() => {
    const storedStats = localStorage.getItem('practiceStats');
    return storedStats ? JSON.parse(storedStats) : {
      practiceTime: 0,
      questionsAnswered: 0,
      mockInterviews: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('selectedRole', selectedRole);
  }, [selectedRole]);

  useEffect(() => {
    localStorage.setItem('practiceStats', JSON.stringify(practiceStats));
  }, [practiceStats]);

  const updateStats = (statType, value) => {
    setPracticeStats(prevStats => ({ ...prevStats, [statType]: prevStats[statType] + value }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const startInterview = (type) => {
    if (type === 'video') {
      navigate('/videoInterview');
    } else if (type === 'text') {
      navigate('/textinterview');
    }
  };

  const scheduleInterview = () => {
    navigate('/scheduler'); // Navigate to the Scheduler page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-8">
          Choose Your Practice Mode
        </h1>

        <div className="relative p-1 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
          <div className="relative bg-indigo-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Schedule Your Interview</h2>
            <p className="text-purple-200 mb-4">
              Ready to take the next step? Schedule a mock interview with a mentor.
            </p>
            <button
              className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration -300 transform hover:-translate-y-1"
              onClick={scheduleInterview}
            >
              Schedule Interview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="group">
            <div className="relative p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Video Interview</h2>
                <p className="text-purple-200 mb-6 flex-grow">
                  Practice with our AI interviewer and get feedback on your body language, tone, and delivery.
                </p>
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => startInterview('video')}
                >
                  Start Video Interview
                </button>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="relative p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Text-Based Interview</h2>
                <p className="text-purple-200 mb-6 flex-grow">
                  Practice through text chat and focus on crafting well-structured responses.
                </p>
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => startInterview('text')}
                >
                  Start Text Interview
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-1 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
          <div className="relative bg-indigo-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Practice for different Roles</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role}
                  className={`p-4 border-2 rounded-lg transition-colors duration-300 
                  ${selectedRole === role
                      ? 'border-purple-400 bg-indigo-800 bg-opacity-50 text-purple-200'
                      : 'border-indigo-700 hover:border-purple-400 hover:bg-indigo-800 hover:bg-opacity-30 text-purple-300'}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative p-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
          <div className="relative bg-indigo-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols -3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-300">Practice Time</p>
                  <p className="text-xl font-semibold text-white">{practiceStats.practiceTime} hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-300">Questions Answered</p>
                  <p className="text-xl font-semibold text-white">{practiceStats.questionsAnswered}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-300">Mock Interviews</p>
                  <p className="text-xl font-semibold text-white">{practiceStats.mockInterviews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;