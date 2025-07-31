// Enhanced HomeCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProviderContext } from '../contexts/theme-context';

const HomeCard = ({ category }) => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeProviderContext); 

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group ${category.bgColor}`}
      onClick={() => navigate(`/categories/${category.id}`)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 dark:from-black/10 dark:to-black/20"></div>
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="flex-1">
          <div className="w-16 h-16 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-md mb-4">
            <img
              src={category.image}
              alt={category.name}
              className="w-10 h-10 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {category.description}
          </p>
        </div>
        
        <button className="mt-4 self-start px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all">
          Start Quiz
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default HomeCard;