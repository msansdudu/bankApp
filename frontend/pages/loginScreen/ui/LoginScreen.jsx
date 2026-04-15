import React, { useState, useContext } from 'react';
import {
    StyleSheet, View, Text, TextInput, TouchableOpacity,
    ActivityIndicator, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { useCurrentUser } from '../../../entities/user/model/UserContext';
import api from '../../../shared/api/apiService';

export default function LoginScreen({ navigation }) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Достаем функцию login из контекста для сохранения данных
    const { login } = useCurrentUser();

    const [loginStr, setLoginStr] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!loginStr || !password) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/users/login', {
                login: loginStr,
                password: password
            });

            // Если успешно, сохраняем { token, userId, login } в AsyncStorage и контекст
            await login(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                Alert.alert("Доступ запрещен", "Неверный логин или пароль");
            } else {
                Alert.alert("Ошибка", "Не удалось связаться с сервером");
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>Вход в Банк</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    placeholderTextColor={theme.textSecondary}
                    value={loginStr}
                    onChangeText={setLoginStr}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor={theme.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.background} />
                    ) : (
                        <Text style={styles.buttonText}>Войти</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={styles.footerLink}
                >
                    <Text style={{ color: theme.textSecondary }}>
                        Нет аккаунта? <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Создать</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { flex: 1, justifyContent: 'center', padding: 24 },
    title: { fontSize: 32, fontWeight: 'bold', color: theme.text, marginBottom: 40, textAlign: 'center' },
    input: {
        backgroundColor: theme.surface,
        color: theme.text,
        padding: 15,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.outline
    },
    button: {
        backgroundColor: theme.primary,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5
    },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: theme.background, fontSize: 18, fontWeight: 'bold' },
    footerLink: { marginTop: 25, alignItems: 'center' }
});