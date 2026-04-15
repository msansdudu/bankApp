import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardsList from '../../../widgets/cardsList';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import TopBar from '../../../widgets/topBar/ui/TopBar';
import OperationsList from '../../../widgets/operationsList';
import { getUserById } from '../../../entities/user/api/api';
import { useCurrentUser } from '../../../entities/user/model/UserContext';

export default function HomeScreen({ navigation, route }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { user: currentUser, logout } = useCurrentUser();

  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userData, setUserData] = useState({ name: 'Загрузка...' });

  // Автоматическое обновление при возврате после перевода
  useEffect(() => {
    if (route.params?.refresh) {
      onRefresh();
      navigation.setParams({ refresh: false });
    }
  }, [route.params?.refresh]);

  const fetchUser = useCallback(async () => {
    if (!currentUser?.id) return;

    try {
      const data = await getUserById(currentUser.id);
      setUserData(data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      }
      console.error("Не удалось загрузить данные профиля", err);
    }
  }, [currentUser?.id, logout]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshTrigger((prev) => prev + 1);

    fetchUser().finally(() => {
      setRefreshing(false);
    });
  }, [fetchUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar name={userData.name} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
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