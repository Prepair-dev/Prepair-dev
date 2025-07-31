// Enhanced QuizCatalog.jsx
import React from 'react';
import { ThemeProviderContext } from '../contexts/theme-context';
import HomeCard from './HomeCard';
import QuizCreationDialog from './QuizCreationDialog';

const QuizCatalog = () => {
    const { theme } = React.useContext(ThemeProviderContext); 
  
  const categories = [
    {
      id: '1',
      name: 'JavaScript',
      description: 'Test your JavaScript knowledge',
      image: '/categories/javascript.svg',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      id: '2',
      name: 'React',
      description: 'Master React concepts',
      image: '/categories/react.svg',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: '3',
      name: 'TypeScript',
      description: 'TypeScript fundamentals',
      image: '/categories/typescript.svg',
      bgColor: 'bg-sky-100 dark:bg-sky-900/30'
    },
  ];

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Quiz Catalog
            </h1>
            <p className="mt-2 text-lg opacity-80">
              Select a category to start your learning journey
            </p>
          </div>
          <QuizCreationDialog />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <HomeCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCatalog;