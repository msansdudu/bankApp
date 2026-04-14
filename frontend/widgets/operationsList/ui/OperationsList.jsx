import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import OperationItem from '../../../entities/operationItem';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { getTransactionsByUserId } from '../../../entities/operationItem/api';
import { useCurrentUser } from '../../../entities/user/model/UserContext';

export default function OperationsList({ refreshTrigger }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { userId } = useCurrentUser();

  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOperations = useCallback(() => {
    getTransactionsByUserId(userId)
      .then((data) => {
        setOperations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch transactions:', error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations, refreshTrigger]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Операции</Text>
      <FlatList
        data={operations}
        keyExtractor={(item) => item.id.toString()}
        vertical
        scrollEnabled={false} // Отключаем внутренний скролл для совместной работы с родителем
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSender = item.senderUserId === userId;
          const participantName = isSender ? item.receiverName : item.senderName;
          const displaySum = isSender ? `-${item.amount}` : `+${item.amount}`;

          return (
            <OperationItem
              destination={participantName || 'Неизвестно'}
              sum={`${displaySum} ${item.currency}`}
              operationType={item.status}
              date={new Date(item.timestamp).toLocaleString([], {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
              theme={theme}
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
      color: theme.text,
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    listContent: {
      paddingVertical: 10,
    },
  });
