import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History } from 'lucide-react';
import { ThemeProviderContext } from '../contexts/theme-context'; 

const HistoryCard = () => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeProviderContext);
  
  return (
    <div 
      className={`p-6 rounded-lg border shadow-md hover:cursor-pointer hover:opacity-75 transition-all ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      onClick={() => navigate('/history')}
    >
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-2xl font-bold">History</h3>
        <History size={28} strokeWidth={2.5} />
      </div>
      <div className="mt-4">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          View past quiz attempts.
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;