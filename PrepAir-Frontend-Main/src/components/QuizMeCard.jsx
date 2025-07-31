import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { ThemeProviderContext } from '../contexts/theme-context'; 

const QuizMeCard = () => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeProviderContext);
  
  return (
    <div 
      className={`p-6 rounded-lg border shadow-md hover:cursor-pointer hover:opacity-75 transition-all ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      onClick={() => navigate('/quiz')}
    >
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-2xl font-bold">Quiz me!</h3>
        <BrainCircuit size={28} strokeWidth={2.5} />
      </div>
      <div className="mt-4">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Challenge yourself to a quiz with a topic of your choice.
        </p>
      </div>
    </div>
  );
};

export default QuizMeCard;