import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Activity } from '../types/activity';
import { ActivityListItem } from './ActivityListItem';

interface ActivityListProps {
  date: string;
  activities: Activity[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
};

export const ActivityList: React.FC<ActivityListProps> = ({ date, activities }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dateHeader}>{formatDate(date)}</Text>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  dateHeader: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
});
