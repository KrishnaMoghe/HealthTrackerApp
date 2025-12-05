import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ActivityList } from '../components/ActivityList';
import { useActivities } from '../hooks/useActivities';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { groupActivitiesByDate } from '../utils/summary';
import { getLast7Days } from '../utils/date';

export const HistoryScreen: React.FC = () => {
  const { activities, refreshActivities, loading } = useActivities();
  const { refreshing, onRefresh } = usePullToRefresh(refreshActivities);

  const last7Days = getLast7Days();
  const filteredActivities = activities.filter(activity => {
    const activityDate = new Date(activity.timestamp).toISOString().split('T')[0];
    return last7Days.includes(activityDate);
  });

  const groupedActivities = groupActivitiesByDate(filteredActivities);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#9ca3af"
          />
        }
      >
        <Text style={styles.heading}>Last 7 Days</Text>

        {groupedActivities.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No activities logged yet</Text>
            <Text style={styles.emptySubtext}>
              Start tracking your water, steps, and sleep!
            </Text>
          </View>
        ) : (
          groupedActivities.map((group) => (
            <ActivityList
              key={group.date}
              date={group.date}
              activities={group.activities}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#e5e7eb',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#6b7280',
    fontSize: 14,
  },
});
