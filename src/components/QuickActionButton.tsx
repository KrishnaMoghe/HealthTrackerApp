import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface QuickActionButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  label,
  onPress,
  backgroundColor = '#1d4ed8',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  label: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '600',
  },
});
