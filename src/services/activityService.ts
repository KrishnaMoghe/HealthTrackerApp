import { Activity, ActivityType } from '../types/activity';
import { getActivities, saveActivity } from './storage';
import { getLast7Days } from '../utils/date';

export const logNewActivity = async (
  type: ActivityType,
  value: number,
  notes?: string
): Promise<Activity> => {
  const activity: Activity = {
    id: Date.now().toString(),
    type,
    value,
    timestamp: new Date().toISOString(),
    notes
  };

  await saveActivity(activity);
  return activity;
};

export const getLast7DaysActivities = async (): Promise<Activity[]> => {
  const allActivities = await getActivities();
  const last7Days = getLast7Days();
  
  return allActivities.filter(activity => {
    const activityDate = new Date(activity.timestamp).toISOString().split('T')[0];
    return last7Days.includes(activityDate);
  });
};

export const getTodayActivities = async (): Promise<Activity[]> => {
  const allActivities = await getActivities();
  const today = new Date().toISOString().split('T')[0];
  
  return allActivities.filter(activity => {
    const activityDate = new Date(activity.timestamp).toISOString().split('T')[0];
    return activityDate === today;
  });
};
