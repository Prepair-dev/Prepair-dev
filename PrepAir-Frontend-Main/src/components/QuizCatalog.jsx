import React from 'react';
import   { ThemeProviderContext } from '../contexts/theme-context';
import HomeCard from './HomeCard';
import QuizCreationDialog from './QuizCreationDialog';

const QuizCatalog = () => {
    const { theme } = React.useContext(ThemeProviderContext); 
  
  const categories = [
    {
      id: '1',
      name: 'JavaScript',
      description: 'Test your JavaScript knowledge',
      image: '/categories/javascript.svg'
    },
    {
      id: '2',
      name: 'React',
      description: 'Master React concepts',
      image: '/categories/react.svg'
    },
    {
      id: '3',
      name: 'TypeScript',
      description: 'TypeScript fundamentals',
      image: '/categories/typescript.svg'
    },
  ];

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Quiz Catalog</h1>
        <QuizCreationDialog />
      </div>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {categories.map((category) => (
          <HomeCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default QuizCatalog;