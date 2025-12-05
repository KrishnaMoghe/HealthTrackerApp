import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';
import { SummaryCard } from '../components/SummaryCard';
import { QuickActionButton } from '../components/QuickActionButton';
import { useActivities } from '../hooks/useActivities';

type Props = BottomTabScreenProps<MainTabParamList, 'Dashboard'>;

const formatToday = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { dailySummary, loading } = useActivities();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.date}>{formatToday()}</Text>
        <Text style={styles.heading}>Today&apos;s Summary</Text>

        <View style={styles.cardsRow}>
          <SummaryCard 
            label="Water" 
            value={dailySummary.water} 
            unit="glasses" 
            accentColor="#0ea5e9" 
          />
          <SummaryCard 
            label="Steps" 
            value={dailySummary.steps} 
            unit="steps" 
            accentColor="#22c55e" 
          />
        </View>
        <View style={[styles.cardsRow, { marginTop: 8 }]}>
          <SummaryCard 
            label="Sleep" 
            value={dailySummary.sleep} 
            unit="hours" 
            accentColor="#a855f7" 
          />
        </View>

        <Text style={styles.subheading}>Quick log</Text>
        <View style={styles.actionsRow}>
          <QuickActionButton
            label="Water"
            backgroundColor="#0ea5e9"
            onPress={() =>
              navigation.navigate('ActivityLogging', { activityType: 'water' })
            }
          />
          <QuickActionButton
            label="Steps"
            backgroundColor="#22c55e"
            onPress={() =>
              navigation.navigate('ActivityLogging', { activityType: 'steps' })
            }
          />
          <QuickActionButton
            label="Sleep"
            backgroundColor="#a855f7"
            onPress={() =>
              navigation.navigate('ActivityLogging', { activityType: 'sleep' })
            }
          />
        </View>
      </View>
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
  date: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 4,
  },
  heading: {
    color: '#e5e7eb',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  cardsRow: {
    flexDirection: 'row',
  },
  subheading: {
    color: '#9ca3af',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
  },
});
