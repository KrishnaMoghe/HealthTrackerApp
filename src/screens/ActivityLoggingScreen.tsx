import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';
import type { ActivityType } from '../types/activity';
import { Ionicons } from '@expo/vector-icons';
import { logNewActivity } from '../services/activityService';
import { useActivities } from '../hooks/useActivities';

type Props = BottomTabScreenProps<MainTabParamList, 'ActivityLogging'>;

const activityOptions: { type: ActivityType; label: string; icon: string; color: string }[] = [
  { type: 'water', label: 'Water', icon: 'water', color: '#0ea5e9' },
  { type: 'steps', label: 'Steps', icon: 'walk', color: '#22c55e' },
  { type: 'sleep', label: 'Sleep', icon: 'moon', color: '#a855f7' },
];

export const ActivityLoggingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { addActivity, refreshActivities } = useActivities();
  const [selectedType, setSelectedType] = useState<ActivityType | null>(
    route.params?.activityType ?? null
  );
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getUnitLabel = (type: ActivityType | null): string => {
    switch (type) {
      case 'water':
        return 'glasses';
      case 'steps':
        return 'steps';
      case 'sleep':
        return 'hours';
      default:
        return 'value';
    }
  };

  const validateValue = (): string | null => {
    if (!selectedType) return 'Please select an activity type';
    if (!value || value.trim() === '') return 'Please enter a value';

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return 'Value must be a positive number';

    if (selectedType === 'sleep' && numValue > 24) {
      return 'Sleep hours cannot exceed 24';
    }
    if (selectedType === 'water' && numValue > 50) {
      return 'Water intake seems too high (max 50 glasses)';
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validateValue();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    try {
      const activity = await logNewActivity(
        selectedType!,
        parseFloat(value),
        notes || undefined
      );
      
      addActivity(activity);
      await refreshActivities();

      Alert.alert('Success', `Logged ${value} ${getUnitLabel(selectedType)}`, [
        {
          text: 'OK',
          onPress: () => {
            setValue('');
            setNotes('');
            setSelectedType(null);
            navigation.navigate('Dashboard');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to log activity. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Log Activity</Text>
        <Text style={styles.timeText}>Current time: {currentTime}</Text>

        <Text style={styles.label}>Activity Type *</Text>
        <View style={styles.typeGrid}>
          {activityOptions.map((option) => (
            <TouchableOpacity
              key={option.type}
              style={[
                styles.typeCard,
                selectedType === option.type && {
                  borderColor: option.color,
                  borderWidth: 2,
                },
              ]}
              onPress={() => setSelectedType(option.type)}
            >
              <Ionicons
                name={option.icon as any}
                size={28}
                color={selectedType === option.type ? option.color : '#6b7280'}
              />
              <Text
                style={[
                  styles.typeLabel,
                  selectedType === option.type && { color: option.color },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>
          Value ({getUnitLabel(selectedType)}) *
        </Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter ${getUnitLabel(selectedType)}`}
          placeholderTextColor="#6b7280"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add any notes..."
          placeholderTextColor="#6b7280"
          multiline
          numberOfLines={4}
          maxLength={200}
          value={notes}
          onChangeText={setNotes}
        />
        <Text style={styles.charCount}>{notes.length}/200</Text>

        <TouchableOpacity
          style={[
            styles.submitButton,
            !selectedType && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!selectedType}
        >
          <Text style={styles.submitText}>Log Activity</Text>
        </TouchableOpacity>
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
  heading: {
    color: '#e5e7eb',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  timeText: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 24,
  },
  label: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#111827',
  },
  typeLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#111827',
    color: '#e5e7eb',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  submitButtonDisabled: {
    backgroundColor: '#1e3a8a',
    opacity: 0.5,
  },
  submitText: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
});
