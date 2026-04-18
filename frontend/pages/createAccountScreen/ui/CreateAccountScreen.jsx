import React, { useState } from 'react';
import { 
    StyleSheet, View, Text, TextInput, TouchableOpacity, 
    ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { createAccount } from '../../../entities/bankCard/api';
import { useCurrentUser } from '../../../entities/user/model/UserContext';

const CURRENCIES = ['RUB', 'USD', 'EUR', 'KZT'];

export default function CreateAccountScreen({ navigation }) {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { user } = useCurrentUser();

    const [currency, setCurrency] = useState('RUB');
    const [accountType, setAccountType] = useState('DEBIT');
    const [balance, setBalance] = useState('0');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!currency || balance === '') {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        setLoading(true);
        try {
            await createAccount({
                userId: user.id,
                currency: currency,
                balance: parseFloat(balance) || 0,
                accountType: accountType
            });

            Alert.alert(
                "Успех", 
                "Новый счет успешно создан!",
                [{ text: "Отлично", onPress: () => navigation.navigate('Home', { refresh: true }) }]
            );
        } catch (error) {
            console.error(error);
            Alert.alert("Ошибка", "Не удалось создать счет. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Новый счет</Text>
                        <Text style={styles.subtitle}>Выберите валюту и укажите начальный баланс</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Выберите валюту</Text>
                        <View style={styles.currencyGrid}>
                            {CURRENCIES.map(curr => (
                                <TouchableOpacity 
                                    key={curr} 
                                    style={[
                                        styles.currencyItem, 
                                        currency === curr && styles.currencyItemActive
                                    ]}
                                    onPress={() => setCurrency(curr)}
                                >
                                    <Text style={[
                                        styles.currencyText,
                                        currency === curr && styles.currencyTextActive
                                    ]}>{curr}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Тип счета</Text>
                            <View style={styles.typeSelector}>
                                <TouchableOpacity 
                                    style={[
                                        styles.typeOption, 
                                        accountType === 'DEBIT' && styles.typeOptionActive
                                    ]}
                                    onPress={() => setAccountType('DEBIT')}
                                >
                                    <Ionicons 
                                        name="card-outline" 
                                        size={20} 
                                        color={accountType === 'DEBIT' ? theme.background : theme.text} 
                                    />
                                    <Text style={[
                                        styles.typeText,
                                        accountType === 'DEBIT' && styles.typeTextActive
                                    ]}>Дебетовый</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.typeOption, 
                                        accountType === 'CREDIT' && styles.typeOptionActive
                                    ]}
                                    onPress={() => setAccountType('CREDIT')}
                                >
                                    <Ionicons 
                                        name="cash-outline" 
                                        size={20} 
                                        color={accountType === 'CREDIT' ? theme.background : theme.text} 
                                    />
                                    <Text style={[
                                        styles.typeText,
                                        accountType === 'CREDIT' && styles.typeTextActive
                                    ]}>Кредитный</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Начальный баланс</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="wallet-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="0.00"
                                    placeholderTextColor={theme.textSecondary}
                                    value={balance}
                                    onChangeText={setBalance}
                                    keyboardType="decimal-pad"
                                />
                                <Text style={styles.currencyBadge}>{currency}</Text>
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={[styles.button, loading && styles.buttonDisabled]} 
                            onPress={handleCreate}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={theme.background} />
                            ) : (
                                <>
                                    <Ionicons name="add-circle" size={24} color={theme.background} style={{ marginRight: 10 }} />
                                    <Text style={styles.buttonText}>Открыть счет</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelButtonText}>Отмена</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        marginBottom: 30,
        backgroundColor: theme.card,
        padding: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: theme.textSecondary,
    },
    form: {
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.text,
        marginBottom: 12,
        marginLeft: 4,
    },
    currencyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    currencyItem: {
        width: '48%',
        height: 60,
        backgroundColor: theme.surface,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: theme.outline,
    },
    currencyItemActive: {
        backgroundColor: theme.primary,
        borderColor: theme.primary,
    },
    currencyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
    },
    currencyTextActive: {
        color: theme.background,
    },
    typeSelector: {
        flexDirection: 'row',
        backgroundColor: theme.surface,
        borderRadius: 15,
        padding: 5,
        borderWidth: 1,
        borderColor: theme.outline,
    },
    typeOption: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    typeOptionActive: {
        backgroundColor: theme.primary,
    },
    typeText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.text,
        marginLeft: 8,
    },
    typeTextActive: {
        color: theme.background,
    },
    inputGroup: {
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.surface,
        borderWidth: 1,
        borderColor: theme.outline,
        borderRadius: 15,
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 55,
        color: theme.text,
        fontSize: 16,
    },
    currencyBadge: {
        fontWeight: 'bold',
        color: theme.primary,
        marginLeft: 10,
    },
    button: {
        backgroundColor: theme.primary,
        flexDirection: 'row',
        height: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: theme.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
    },
    cancelButtonText: {
        color: theme.textSecondary,
        fontSize: 16,
    },
});
