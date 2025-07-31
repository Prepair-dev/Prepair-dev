import React from 'react';
import { useParams } from 'react-router-dom';
import   { ThemeProviderContext } from '../contexts/theme-context';

const QuizSetup = () => {
  const { quizId } = useParams();
  const { theme } = React.useContext(ThemeProviderContext); 
  
  const quiz = {
    id: quizId,
    title: `Quiz ${quizId}`,
    description: `This is quiz ${quizId} setup page`
  };

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-4xl font-bold">{quiz.title}</h1>
      <p className="mt-2 text-xl">{quiz.description}</p>
      <div className="mt-8">
        <button className={`px-6 py-3 rounded-lg font-bold ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;