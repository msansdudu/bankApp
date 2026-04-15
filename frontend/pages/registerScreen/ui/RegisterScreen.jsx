import React, { useState, useContext } from 'react';
import {
    StyleSheet, View, Text, TextInput, TouchableOpacity,
    ActivityIndicator, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { useCurrentUser } from '../../../entities/user/model/UserContext';
import api from '../../../shared/api/apiService';

export default function RegisterScreen({ navigation }) {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { login } = useCurrentUser();

    const [formData, setFormData] = useState({
        name: '',
        login: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!formData.name || !formData.login || !formData.email || !formData.password) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        setLoading(true);
        try {
            await api.post('/users/register', formData);

            const response = await api.post('/users/login', {
                login: formData.login,
                password: formData.password
            });

            // сохраняем токен и данные в контекст
            await login(response.data);

        } catch (error) {
            // Обработка ошибки дубликата (409)
            if (error.response?.status === 409) {
                Alert.alert("Ошибка", "Этот логин или email уже заняты");
            } else {
                Alert.alert("Ошибка", "Не удалось создать аккаунт"); // TODO: обработка короткого пароля и тд
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Регистрация</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ваше имя"
                    placeholderTextColor={theme.textSecondary}
                    onChangeText={(val) => setFormData({ ...formData, name: val })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(val) => setFormData({ ...formData, email: val })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    placeholderTextColor={theme.textSecondary}
                    autoCapitalize="none"
                    onChangeText={(val) => setFormData({ ...formData, login: val })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor={theme.textSecondary}
                    secureTextEntry
                    onChangeText={(val) => setFormData({ ...formData, password: val })}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                    {loading ? <ActivityIndicator color={theme.background} /> : <Text style={styles.buttonText}>Создать аккаунт</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.footerLink}>
                    <Text style={{ color: theme.textSecondary }}>Уже есть аккаунт? <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Войти</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inner: { flex: 1, justifyContent: 'center', padding: 24 },
    title: { fontSize: 32, fontWeight: 'bold', color: theme.text, marginBottom: 30, textAlign: 'center' },
    input: {
        backgroundColor: theme.surface,
        color: theme.text,
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.outline
    },
    button: {
        backgroundColor: theme.primary,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: { color: theme.background, fontSize: 18, fontWeight: 'bold' },
    footerLink: { marginTop: 20, alignItems: 'center' }
});