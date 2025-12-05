import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SummaryCardProps {
  label: string;
  value: number;
  unit: string;
  accentColor?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  unit,
  accentColor = '#2563eb',
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  label: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginRight: 6,
  },
  unit: {
    color: '#6b7280',
    fontSize: 14,
  },
});
