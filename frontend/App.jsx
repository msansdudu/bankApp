import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './shared/lib/themes/ThemeContext';
import { UserProvider } from './entities/user/model/UserContext';
import HomeScreen from './pages/homeScreen';
import ProfileScreen from './pages/profileScreen';
import NotificationsScreen from './pages/notificationsScreen';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Профиль' }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ title: 'Уведомления' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}