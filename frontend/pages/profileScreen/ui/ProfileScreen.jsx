import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { useCurrentUser } from '../../../entities/user/model/UserContext';
import { getUserById } from '../../../entities/user/api/api';

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const { userId } = useCurrentUser();
  const [user, setUser] = useState(null);
  const styles = createStyles(theme);

  useEffect(() => {
    getUserById(userId)
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={50} color={theme.primary} />
        </View>
        <Text style={styles.name}>{user?.name || 'Загрузка...'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
      </View>

      <View style={styles.menu}>
        <MenuButton icon="settings-outline" title="Настройки" theme={theme} />
        <MenuButton icon="shield-checkmark-outline" title="Безопасность" theme={theme} />
        <MenuButton icon="help-circle-outline" title="Поддержка" theme={theme} />
        
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const MenuButton = ({ icon, title, theme }) => {
  const styles = createStyles(theme);
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={22} color={theme.text} />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: theme.card,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: theme.textSecondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  email: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 5,
  },
  menu: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.card,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: theme.card,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  }
});
