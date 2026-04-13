import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import BankCard from '../../../entitites/bankCard';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';

const mockCards = [
  {
    id: '1',
    cardType: 'Visa',
    cardNumber: '1234 5678 9012 3456',
    cardOrder: 'DEBIT',
    balance: '₽2 000',
  },
  {
    id: '2',
    cardType: 'MasterCard',
    cardNumber: '9876 5432 1098 7654',
    cardOrder: 'CREDIT',
    balance: '₽23 000',
  },
  {
    id: '3',
    cardType: 'МИР',
    cardNumber: '5555 4444 3333 2222',
    cardOrder: 'DEBIT',
    balance: '₽123,2',
  },
];

export default function CardsList() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мои карты</Text>
      <FlatList
        data={mockCards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <BankCard
            cardType={item.cardType}
            cardNumber={item.cardNumber}
            cardOrder={item.cardOrder}
            balance={item.balance}
            expiryDate={item.expiryDate}
            theme={theme}
          />
        )}
      />
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
  });
