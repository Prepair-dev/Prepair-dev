
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProviderContext } from '../contexts/theme-context'; 

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeProviderContext);

  const handleClick = () => {
    navigate(`/quiz/setup/${quiz.id}`);
  };

  return (
    <div
      className={`border-2 rounded-xl p-1 cursor-pointer shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]
        hover:-translate-y-1 transition-transform duration-300 ease-in-out ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}
      onClick={handleClick}
    >
      <div className="py-2 px-6 flex flex-col gap-4">
        <div className={`rounded-xl h-[16rem] py-1 ${
          theme === 'dark' ? 'bg-[#97dbff]/10' : 'bg-[#97dbff]/20'
        }`}>
          <img
            src={quiz.image || `/quizzes/image--${quiz.title.toLowerCase().split(' ').join('-')}.svg`}
            alt={quiz.title}
            className="h-full w-full object-contain rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <p className={`leading-none font-semibold ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {quiz.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className={`semi-bold text-sm flex items-center gap-2 leading-none ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <span>Total Questions: </span>
            <span className={`font-bold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {quiz.questions.length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;