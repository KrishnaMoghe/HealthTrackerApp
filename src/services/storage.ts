import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity } from '../types/activity';

const STORAGE_KEY = '@health_tracker_activities';

export const saveActivity = async (activity: Activity): Promise<void> => {
  try {
    const existing = await getActivities();
    const updated = [activity, ...existing];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving activity:', error);
    throw new Error('Failed to save activity');
  }
};

export const getActivities = async (): Promise<Activity[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting activities:', error);
    return [];
  }
};

export const clearActivities = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing activities:', error);
    throw new Error('Failed to clear activities');
  }
};
