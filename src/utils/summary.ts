import { Activity, DailySummary } from '../types/activity';
import { getDateKey, isToday } from './date';

export const calculateDailySummary = (activities: Activity[]): DailySummary => {
  const todayActivities = activities.filter(activity => 
    isToday(activity.timestamp)
  );

  return {
    water: todayActivities
      .filter(a => a.type === 'water')
      .reduce((sum, a) => sum + a.value, 0),
    steps: todayActivities
      .filter(a => a.type === 'steps')
      .reduce((sum, a) => sum + a.value, 0),
    sleep: todayActivities
      .filter(a => a.type === 'sleep')
      .reduce((sum, a) => sum + a.value, 0),
    date: new Date().toISOString()
  };
};

export const groupActivitiesByDate = (activities: Activity[]) => {
  const grouped: { [key: string]: Activity[] } = {};

  activities.forEach(activity => {
    const dateKey = getDateKey(new Date(activity.timestamp));
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(activity);
  });

  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map(date => ({
      date,
      activities: grouped[date].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    }));
};
