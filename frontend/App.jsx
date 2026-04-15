import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './shared/lib/themes/ThemeContext';
import { UserProvider } from './entities/user/model/UserContext';
import HomeScreen from './pages/homeScreen';
import ProfileScreen from './pages/profileScreen';
import NotificationsScreen from './pages/notificationsScreen';
import LoginScreen from './pages/loginScreen';
import RegisterScreen from './pages/registerScreen';
import CardDetailsScreen from './pages/cardDetailsScreen/ui/CardDetailsScreen';
import TransferScreen from './pages/transferScreen/ui/TransferScreen';
import { useCurrentUser } from './entities/user/model/UserContext';
import { ActivityIndicator, View, StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Уведомления' }} />
      <Stack.Screen name="CardDetails" component={CardDetailsScreen} options={{ title: 'Карта' }} />
      <Stack.Screen name="TransferMoney" component={TransferScreen} options={{ title: 'Перевод' }} />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useCurrentUser();
  const { theme, isDarkMode } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      {user ? <MainNavigator /> : <AuthNavigator />}
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}