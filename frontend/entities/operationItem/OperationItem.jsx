import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OperationItem({ operationType, destination, sum, date, theme }) {
  const [isPressed, setIsPressed] = useState(false);
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
      }}
      style={[styles.oper, isPressed && styles.opPressed]}
    >
      <View style={styles.operationInfo}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Ionicons 
                name="swap-horizontal-outline" 
                size={24} 
                color={theme.text}
            />
          </View>
          <View style={styles.infoLeft}>
            <Text style={styles.topText}>{destination}</Text>
            <Text style={styles.bottomText}>{operationType}</Text>
          </View>
        </View>
        <View style={styles.infoRight}>
          <Text style={[{ textAlign: 'right' }, styles.topText ]}>{sum}</Text>
          <Text style={[{ textAlign: 'right' }, styles.bottomText]}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme) => StyleSheet.create({
  oper: {
    width: '100%' - 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    height: 70,
    borderRadius: 16,
    backgroundColor: theme.card,
    alignItems: 'center',
    justifyContent: 'center', 
    shadowColor: theme.textSecondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  opPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  operationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '88%',
  },
  infoLeft: {
    marginLeft: '12%',
    flexDirection: 'column',
  },
  infoRight: {
    flexDirection: 'column',
  },
  bottomText: {
    color: theme.text,
    marginTop: '5%',
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 1,
  },
  topText: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  }
});


