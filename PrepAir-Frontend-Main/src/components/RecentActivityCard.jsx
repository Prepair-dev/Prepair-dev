import React from 'react';
import { Link } from 'react-router-dom';
import HistoryComponent from './HistoryComponent';
import { ThemeProviderContext } from '../contexts/theme-context'; 

const RecentActivityCard = () => {
  const { theme } = React.useContext(ThemeProviderContext);
  const games_count = 15;

  return (
    <div className={`p-6 rounded-lg border shadow-md col-span-4 lg:col-span-3 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="mb-4">
        <h3 className="text-2xl font-bold">
          <Link to="/history" className="hover:underline">Recent Activity</Link>
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          You have played a total of {games_count} quizzes.
        </p>
      </div>
      <div className="max-h-[580px] overflow-auto">
        <HistoryComponent limit={5} />
      </div>
    </div>
  );
};

export default RecentActivityCard;