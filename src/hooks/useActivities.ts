import { useContext } from 'react';
import { ActivityContext } from '../contexts/ActivityContext';

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within ActivityProvider');
  }
  return context;
};
