import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BankCard from '../../../entities/bankCard';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { getAccountsByUserId } from '../../../entities/bankCard/api';
import { useCurrentUser } from '../../../entities/user/model/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function CardsList({ refreshTrigger }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useCurrentUser();
  const navigation = useNavigation();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const data = await getAccountsByUserId(user.id);
      setCards([...data, { id: 'add-btn', isAddButton: true }]);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

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
        renderItem={({ item }) => {
          if (item.isAddButton) {
            return (
              <TouchableOpacity
                style={styles.addCardButton}
                onPress={() => navigation.navigate('CreateAccount')}
              >
                <Ionicons name="add-circle-outline" size={48} color={theme.primary} />
                <Text style={styles.addCardText}>Добавить счет</Text>
              </TouchableOpacity>
            );
          }
          return (
            <BankCard
              cardType={item.accountType}
              cardNumber={item.accountNumber}
              cardOrder="MIR"
              balance={`${item.balance} ${item.currency}`}
              theme={theme}
              onPress={() => navigation.navigate('CardDetails', { account: item })}
            />
          );
        }}
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
    addCardButton: {
      width: 220,
      height: 130,
      marginRight: 16,
      borderRadius: 16,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.outline,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.textSecondary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    addCardText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: '600',
      color: theme.primary,
    },
  });
