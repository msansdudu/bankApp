import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';

export default function TopBar({ name }) {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const styles = createStyles(theme);

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  return (
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfile}
          activeOpacity={0.7}
        >
          <View style={styles.profileContainer}>
            <Ionicons 
              name="person-outline" 
              size={24} 
              color={theme.text} 
            />
            <Text style={styles.profileText}>{name}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.rightActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleNotifications}
            activeOpacity={0.7}
          >
            <Ionicons 
              name="notifications-outline" 
              size={24} 
              color={theme.text} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleThemeToggle}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isDarkMode ? "sunny-outline" : "moon-outline"} 
              size={24} 
              color={theme.text} 
            />
          </TouchableOpacity>
        </View>
      </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },

  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: theme.textSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    paddingHorizontal: 11,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.textSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileText: {
    marginLeft: 5,
    fontSize: 16,
    color: theme.text,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
});