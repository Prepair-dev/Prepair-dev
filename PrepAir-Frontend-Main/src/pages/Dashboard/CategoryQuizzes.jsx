import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProviderContext } from '../../contexts/theme-context'; 
import QuizCard from '../../components/QuizCard';

const CategoryQuizzes = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeProviderContext);
  
  const quizzes = {
    '1': [ 
      {
        id: 'js1',
        title: 'JavaScript Basics',
        description: 'Fundamental JavaScript concepts',
        questions: new Array(10).fill(null),
        image: '/quizzes/javascript-basics.svg'
      },
      {
        id: 'js2',
        title: 'ES6 Features',
        description: 'Modern JavaScript features',
        questions: new Array(15).fill(null),
        image: '/quizzes/es6.svg'
      }
    ],
    '2': [ 
      {
        id: 'react1',
        title: 'React Fundamentals',
        description: 'Core React concepts',
        questions: new Array(12).fill(null),
        image: '/quizzes/react-fundamentals.svg'
      },
      {
        id: 'react2',
        title: 'React Hooks',
        description: 'Master React hooks',
        questions: new Array(8).fill(null),
        image: '/quizzes/react-hooks.svg'
      }
    ],
    '3': [ 
      {
        id: 'ts1',
        title: 'TypeScript Basics',
        description: 'TypeScript fundamentals',
        questions: new Array(10).fill(null),
        image: '/quizzes/typescript-basics.svg'
      }
    ]
  };

  const categoryQuizzes = quizzes[categoryId] || [];

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <button 
        onClick={() => navigate(-1)}
        className={`mb-4 px-4 py-2 rounded-md ${
          theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Back to Categories
      </button>
      <h1 className="text-4xl font-bold">Quizzes</h1>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {categoryQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default CategoryQuizzes;