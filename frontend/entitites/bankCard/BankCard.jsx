import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BankCard({ cardType, cardNumber, cardOrder, balance, theme }) {
  const [isPressed, setIsPressed] = useState(false);
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
      }}
      style={[styles.card, isPressed && styles.cardPressed]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>{cardType}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.chipContainer}>
          <View style={styles.chipContainer}>
            <LinearGradient
              colors={['#ffffff', '#dcdcdc', '#b8b8b8', '#e8e8e8', '#ffffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.chip}
            />
            <Text style={styles.balance}>{balance}</Text>
          </View>
        </View>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardValue}>{cardOrder}</Text>
          </View>
          <View>
            <Text style={styles.cardNumber}>{'**' + cardNumber.split(' ')[3]}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme) => StyleSheet.create({
  card: {
    width: 220,
    height: 130,
    borderRadius: 16,
    backgroundColor: theme.card,
    padding: '8%',
    marginRight: 16,
    shadowColor: theme.textSecondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 8,
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '10%',
  },

  cardType: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.text,
    letterSpacing: 1.5,
  },

  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },

  chip: {
    width: 34,
    height: 24,
    borderRadius: 6,
    marginRight: 12,
    shadowColor: theme.textSecondary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
  },


  balance: {
    marginLeft: '2%',
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    letterSpacing: 0.3,
  },

  cardNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    letterSpacing: 1.5,
  },

  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '3%',
  },

  cardValue: {
    marginRight: '4%',
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    letterSpacing: 1,
  },
});


