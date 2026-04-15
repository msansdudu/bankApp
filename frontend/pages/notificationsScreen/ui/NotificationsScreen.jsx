import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { useCurrentUser } from '../../../entities/user/model/UserContext';
import { getNotificationsByUserId, markNotificationAsRead } from '../../../entities/notificationItem/api/api';
import NotificationItem from '../../../entities/notificationItem';

export default function NotificationsScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { user, logout } = useCurrentUser();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = useCallback(async () => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        try {
            const data = await getNotificationsByUserId(user.id);
            setNotifications(data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            // Если токен невалиден — разлогиниваем
            if (error.response?.status === 401) logout();
        } finally {
            setLoading(false);
        }
    }, [user?.id, logout]);

    const handleNotificationPress = useCallback(async (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );

        try {
            await markNotificationAsRead(id);
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <NotificationItem
                        notificationType={item.type}
                        message={item.message}
                        isRead={item.isRead}
                        amount={item.amount}
                        date={new Date(item.timestamp).toLocaleString([], {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                        theme={theme}
                        onPress={() => handleNotificationPress(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={64} color={theme.primary} />
                        <Text style={styles.emptyText}>Уведомлений пока нет</Text>
                    </View>
                }
            />
        </View>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        listContent: {
            paddingTop: 10,
            paddingBottom: 20,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
        },
        emptyText: {
            color: theme.textSecondary,
            fontSize: 16,
            marginTop: 10,
        },
    });
