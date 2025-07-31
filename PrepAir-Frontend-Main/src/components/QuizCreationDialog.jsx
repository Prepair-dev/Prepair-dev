// QuizCreationDialog.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProviderContext } from '../contexts/theme-context';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import DropdownSelect from './DropdownSelect';
import DifficultySelector from './DifficultySelector';
import { topics, subtopics, difficultyLevels, quizQuestions } from '../utils/data';

const QuizCreationDialog = () => {
  const { theme } = React.useContext(ThemeProviderContext); 
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const navigate = useNavigate();

  const handleDifficultyToggle = (difficulty) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };

  const handleStartTest = () => {
    // Filter questions based on selections
    let filteredQuestions = quizQuestions;
    
    if (selectedTopic) {
      filteredQuestions = filteredQuestions.filter(q => q.topic === topics.find(t => t.id === selectedTopic)?.name);
    }
    
    if (selectedSubtopic) {
      filteredQuestions = filteredQuestions.filter(q => q.subtopic === selectedSubtopic);
    }
    
    if (selectedDifficulties.length > 0) {
      filteredQuestions = filteredQuestions.filter(q => selectedDifficulties.includes(q.level));
    }
    
    // Navigate to test page with filtered questions
    navigate('/quiz/test');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
          <Plus size={18} />
          Create Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-0 shadow-2xl`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Create New Quiz
          </DialogTitle>
          <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Select your quiz preferences to get started
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <DropdownSelect
            label="Topic"
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setSelectedSubtopic('');
            }}
            options={topics.map(t => ({ value: t.id, label: t.name }))}
            placeholder="Select a topic"
          />

          {selectedTopic && (
            <DropdownSelect
              label="Subtopic"
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              options={subtopics[selectedTopic]?.map(st => ({ value: st, label: st }))}
              placeholder="Select a subtopic"
            />
          )}

          <DifficultySelector
            label="Difficulty Level"
            levels={difficultyLevels}
            selectedLevels={selectedDifficulties}
            onToggle={handleDifficultyToggle}
          />

          <Button
            onClick={handleStartTest}
            disabled={!selectedTopic || selectedDifficulties.length === 0}
            className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
          >
            Start Test
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizCreationDialog;