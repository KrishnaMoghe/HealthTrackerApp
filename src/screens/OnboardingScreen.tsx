import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Health Tracker</Text>
      <Text style={styles.subtitle}>
        Track your daily water intake, steps, and sleep in one simple dashboard.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e5e7eb',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  buttonText: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
});
