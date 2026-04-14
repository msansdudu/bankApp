import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardsList from '../../../widgets/cardsList';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import TopBar from '../../../widgets/topBar/ui/TopBar';
import OperationsList from '../../../widgets/operationsList';
import { getUserById } from '../../../entities/user/api/api';
import { useCurrentUser } from '../../../entities/user/model/UserContext';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { userId } = useCurrentUser();

  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [user, setUser] = useState({ name: 'Загрузка...' });

  const fetchUser = useCallback(() => {
    getUserById(userId)
      .then((data) => setUser(data))
      .catch((err) => console.error('Failed to fetch user:', err));
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Увеличиваем триггер, чтобы уведомить дочерние компоненты об обновлении
    setRefreshTrigger((prev) => prev + 1);
    fetchUser();

    // Имитируем окончание загрузки через небольшую задержку
    // (виджеты сами загрузят данные, а индикатор мы скроем чуть позже)
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [fetchUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar name={user.name} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} tintColor={theme.primary} />
        }
      >
        <CardsList refreshTrigger={refreshTrigger} />
        <OperationsList refreshTrigger={refreshTrigger} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    paddingBottom: 20,
  }
});