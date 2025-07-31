import React from 'react';
import   { ThemeProviderContext } from '../../contexts/theme-context';
import HistoryCard from '../../components/HistoryCard';
import HotTopicsCard from '../../components/HotTopicsCard';
import QuizMeCard from '../../components/QuizMeCard';
import RecentActivityCard from '../../components/RecentActivityCard';
import DetailsDialog from '../../components/DetailsDialog';

const Dashboard = () => {
    const { theme } = React.useContext(ThemeProviderContext); 

  return (
    <main className={`p-8 mx-auto max-w-7xl min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
        <DetailsDialog />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivityCard />
      </div>
    </main>
  );
};

export default Dashboard;