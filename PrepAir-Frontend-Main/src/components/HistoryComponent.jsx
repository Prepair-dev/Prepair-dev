import React from 'react';
import { ThemeProviderContext } from '../contexts/theme-context'; 

const HistoryComponent = ({ limit }) => {
    const { theme } = React.useContext(ThemeProviderContext);

  const historyData = [
    { topic: "React", score: 85, date: "2023-05-15" },
    { topic: "JavaScript", score: 78, date: "2023-05-14" },
    { topic: "TypeScript", score: 92, date: "2023-05-12" },
    { topic: "CSS", score: 65, date: "2023-05-10" },
    { topic: "HTML", score: 88, date: "2023-05-08" },
  ].slice(0, limit);

  return (
    <div className="space-y-4">
      {historyData.map((item, index) => (
        <div 
          key={index} 
          className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{item.topic}</span>
            <span className={`px-2 py-1 rounded text-sm ${
              item.score > 80 ? (theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
              item.score > 60 ? (theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
              (theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
            }`}>
              {item.score}%
            </span>
          </div>
          <div className={`text-xs mt-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {new Date(item.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryComponent;