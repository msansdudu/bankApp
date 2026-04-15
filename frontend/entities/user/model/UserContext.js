import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_session';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Здесь будет { id, login, token }
  const [loading, setLoading] = useState(true);

  // Проверяем наличие токена при старте приложения
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser({
            ...parsedUser,
            id: parsedUser.id || parsedUser.userId
          });
        }
      } catch (e) {
        console.error("Ошибка загрузки токена", e);
      } finally {
        setLoading(false);
      }
    };
    loadStorageData();
  }, []);

  const login = async (userData) => {
    const normalizedUser = {
      ...userData,
      id: userData.id || userData.userId
    };
    setUser(normalizedUser);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a UserProvider');
  }
  return context;
};
