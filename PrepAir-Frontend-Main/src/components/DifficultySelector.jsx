import React from 'react';
import   { ThemeProviderContext } from '../contexts/theme-context';

const DifficultySelector = ({ label, levels, selectedLevels, onToggle }) => {
    const { theme } = React.useContext(ThemeProviderContext); 

  return (
    <div>
      <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {label} (Select one or more)
      </label>
      <div className="flex flex-wrap gap-2">
        {levels.map(level => (
          <button
            key={level}
            type="button"
            onClick={() => onToggle(level)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedLevels.includes(level)
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-800'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;