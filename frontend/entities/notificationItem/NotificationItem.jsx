import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function NotificationItem({ notificationType, message, date, isRead, amount, theme, onPress }) {
    const [isPressed, setIsPressed] = useState(false);
    const styles = createStyles(theme);

    // Подбираем иконку в зависимости от типа уведомления
    const getIcon = () => {
        const type = notificationType.toLowerCase();
        if (type.includes('перевод')) return 'swap-horizontal-outline';
        if (type.includes('напоминание')) return 'time-outline';
        return 'information-circle-outline';
    };

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPress}
            style={[styles.container, isPressed && styles.pressed]}
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name={getIcon()}
                        size={24}
                        color={theme.primary}
                    />
                    {!isRead && <View style={styles.unreadDot} />}
                </View>
                
                <View style={styles.textContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={1}>{notificationType}</Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                    <View style={styles.messageRow}>
                        <Text style={styles.message} numberOfLines={2}>{message}</Text>
                        {amount && (
                            <Text style={styles.amount}>
                                {amount > 0 ? `+${amount}` : amount}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 16,
        borderRadius: 20,
        backgroundColor: theme.card,
        shadowColor: theme.textSecondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    pressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    unreadDot: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.primary,
        borderWidth: 2,
        borderColor: theme.card,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        color: theme.text,
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    date: {
        color: theme.textSecondary,
        fontSize: 11,
        fontWeight: '400',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    message: {
        flex: 1,
        color: theme.text,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        marginRight: 8,
    },
    amount: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '700',
    }
});


