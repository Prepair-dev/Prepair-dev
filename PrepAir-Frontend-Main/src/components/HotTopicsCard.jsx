import React from 'react';
import WordCloud from './WordCloud';
import   { ThemeProviderContext }   from '../contexts/theme-context';

const HotTopicsCard = () => {
    const { theme } = React.useContext(ThemeProviderContext); 
  
  const formattedTopics = [
    { text: "React", value: 25 },
    { text: "JavaScript", value: 30 },
    { text: "TypeScript", value: 20 },
    { text: "Node.js", value: 15 },
    { text: "CSS", value: 18 },
    { text: "HTML", value: 12 },
    { text: "Tailwind", value: 22 },
    { text: "Redux", value: 10 },
  ];

  return (
    <div className={`p-6 rounded-lg border shadow-md col-span-4 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Hot Topics</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Click on a topic to start a quiz on it.
        </p>
      </div>
      <WordCloud formattedTopics={formattedTopics} />
    </div>
  );
};

export default HotTopicsCard;