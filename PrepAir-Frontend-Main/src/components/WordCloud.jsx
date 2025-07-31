// src/components/dashboard/WordCloud.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import   { ThemeProviderContext }   from '../contexts/theme-context';
import D3WordCloud from 'react-d3-cloud';

const fontSizeMapper = (word) => Math.log2(word.value) * 5 + 16;

const WordCloud = ({ formattedTopics }) => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeProviderContext); 

  return (
    <div className="w-full h-[550px]">
      <D3WordCloud
        data={formattedTopics}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme === 'dark' ? 'white' : 'black'}
        onWordClick={(event, word) => {
          navigate(`/quiz?topic=${encodeURIComponent(word.text)}`);
        }}
      />
    </div>
  );
};

export default WordCloud;