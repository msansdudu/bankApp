import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import BankCard from '../../../entities/bankCard';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { getAccountsByUserId } from '../../../entities/bankCard/api';
import { useCurrentUser } from '../../../entities/user/model/UserContext';

export default function CardsList({ refreshTrigger }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { userId } = useCurrentUser();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(() => {
    getAccountsByUserId(userId)
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch cards:', error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards, refreshTrigger]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мои карты</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <BankCard
            cardType={item.accountType}
            cardNumber={item.accountNumber}
            cardOrder="MIR"
            balance={`${item.balance} ${item.currency}`}
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
