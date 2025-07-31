import React, { useState } from 'react';
import   { ThemeProviderContext } from '../contexts/theme-context';
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

const QuizCreationDialog = () => {
    const { theme } = React.useContext(ThemeProviderContext); 
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  const topics = [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'React' },
    { id: '3', name: 'TypeScript' },
  ];

  const subtopics = {
    '1': ['Variables', 'Functions', 'ES6'],
    '2': ['Components', 'Hooks', 'Context'],
    '3': ['Types', 'Interfaces', 'Generics']
  };

  const difficultyLevels = ['Easy', 'Medium', 'Hard'];

  const handleDifficultyToggle = (difficulty) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty) 
        : [...prev, difficulty]
    );
  };

  const handleStartTest = () => {
    console.log({
      topic: selectedTopic,
      subtopic: selectedSubtopic,
      difficulties: selectedDifficulties
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          Create Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
          <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Select your quiz preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
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
            className="w-full mt-4"
          >
            Start Test
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizCreationDialog;