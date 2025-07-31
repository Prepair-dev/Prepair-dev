import React from 'react';
import   { ThemeProviderContext } from '../contexts/theme-context';

const DropdownSelect = ({ label, value, onChange, options, placeholder }) => {
    const { theme } = React.useContext(ThemeProviderContext); 

  return (
    <div>
      <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded-md border ${
          theme === 'dark' 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-900'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;