import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NotificationItem from '../../../entities/notificationItem';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { getNotificationsByUserId, markNotificationAsRead } from '../../../entities/notificationItem/api/api';
import { useCurrentUser } from '../../../entities/user/model/UserContext';

export default function NotificationsScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { userId } = useCurrentUser();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = useCallback(() => {
        getNotificationsByUserId(userId)
            .then((data) => {
                setNotifications(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch notifications:', error);
                setLoading(false);
            });
    }, [userId]);

    const handleNotificationPress = useCallback((id) => {
        // Оптимистичное обновление
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
        markNotificationAsRead(id).catch(err => console.error(err));
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
                contentContainerStyle={[styles.listContent, { flexGrow: 1 }]}
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
