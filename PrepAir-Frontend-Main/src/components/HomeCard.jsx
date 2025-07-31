import React from 'react';
import { useNavigate } from 'react-router-dom';
import   { ThemeProviderContext } from '../contexts/theme-context';

const HomeCard = ({ category }) => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeProviderContext); 

  return (
    <div
      className={`border-2 rounded-xl p-1 cursor-pointer shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]
        hover:-translate-y-1 transition-transform duration-300 ease-in-out ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}
      onClick={() => navigate(`/categories/${category.id}`)}
    >
      <div className="rounded-xl h-[9rem] py-1">
        <img
          src={category.image || `/categories/image--${category.name.toLowerCase().split(' ').join('-')}.svg`}
          alt={category.name}
          className="h-full w-full object-contain rounded-xl"
        />
      </div>
      <div className="py-2 px-6 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">{category.name}</h2>
          <p className={`text-sm leading-none font-semibold ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;