import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Info } from 'lucide-react';
import { ThemeProviderContext } from '../contexts/theme-context'; 

const DetailsDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = React.useContext(ThemeProviderContext);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Info className="w-4 h-4 mr-2" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
        <DialogHeader>
          <DialogTitle>Dashboard Information</DialogTitle>
          <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Here you can find all your quiz statistics and activities.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            The dashboard provides an overview of your learning progress, including:
          </p>
          <ul className={`list-disc pl-5 space-y-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <li>Quick access to start new quizzes</li>
            <li>Your quiz history and performance</li>
            <li>Popular topics to explore</li>
            <li>Recent activity and achievements</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;