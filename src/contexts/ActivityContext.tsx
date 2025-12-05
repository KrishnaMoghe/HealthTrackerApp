import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Activity, DailySummary } from '../types/activity';
import { getActivities } from '../services/storage';
import { calculateDailySummary } from '../utils/summary';

interface ActivityContextType {
  activities: Activity[];
  dailySummary: DailySummary;
  refreshActivities: () => Promise<void>;
  addActivity: (activity: Activity) => void;
  loading: boolean;
}

export const ActivityContext = createContext<ActivityContextType>({
  activities: [],
  dailySummary: { water: 0, steps: 0, sleep: 0, date: '' },
  refreshActivities: async () => {},
  addActivity: () => {},
  loading: true,
});

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dailySummary, setDailySummary] = useState<DailySummary>({
    water: 0,
    steps: 0,
    sleep: 0,
    date: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  const refreshActivities = async () => {
    try {
      const loadedActivities = await getActivities();
      setActivities(loadedActivities);
      setDailySummary(calculateDailySummary(loadedActivities));
    } catch (error) {
      console.error('Error refreshing activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const addActivity = (activity: Activity) => {
    setActivities(prev => [activity, ...prev]);
    setDailySummary(calculateDailySummary([activity, ...activities]));
  };

  useEffect(() => {
    refreshActivities();
  }, []);

  return (
    <ActivityContext.Provider 
      value={{ 
        activities, 
        dailySummary, 
        refreshActivities, 
        addActivity,
        loading 
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
