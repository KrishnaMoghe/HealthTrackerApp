import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Activity } from '../types/activity';

interface ActivityListItemProps {
  activity: Activity;
}

const getActivityIcon = (type: string): string => {
  switch (type) {
    case 'water':
      return 'water';
    case 'steps':
      return 'walk';
    case 'sleep':
      return 'moon';
    default:
      return 'ellipse';
  }
};

const getActivityColor = (type: string): string => {
  switch (type) {
    case 'water':
      return '#0ea5e9';
    case 'steps':
      return '#22c55e';
    case 'sleep':
      return '#a855f7';
    default:
      return '#6b7280';
  }
};

const getActivityUnit = (type: string): string => {
  switch (type) {
    case 'water':
      return 'glasses';
    case 'steps':
      return 'steps';
    case 'sleep':
      return 'hours';
    default:
      return '';
  }
};

export const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
  const color = getActivityColor(activity.type);
  const icon = getActivityIcon(activity.type);
  const time = new Date(activity.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.type}>{activity.type.toUpperCase()}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.value}>
          {activity.value} {getActivityUnit(activity.type)}
        </Text>
        {activity.notes && <Text style={styles.notes}>{activity.notes}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  type: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
  },
  time: {
    color: '#6b7280',
    fontSize: 12,
  },
  value: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notes: {
    color: '#9ca3af',
    fontSize: 13,
  },
});
