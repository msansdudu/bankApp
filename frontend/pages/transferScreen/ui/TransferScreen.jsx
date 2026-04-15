import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TextInput, TouchableOpacity,
    ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import { getAccountByNumber } from '../../../entities/bankCard/api';
import { transferMoney } from '../../../entities/operationItem/api';
import { formatAccountNumber, stripAccountNumber } from '../../../shared/lib/utils/format';

export default function TransferScreen({ route, navigation }) {
    const { sourceAccount } = route.params;
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const [recipientNumber, setRecipientNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRecipientNumberChange = (text) => {
        const cleanText = stripAccountNumber(text);
        if (cleanText.length <= 16) {
            setRecipientNumber(cleanText);
        }
    };

    const handleTransfer = async () => {
        if (!recipientNumber || !amount) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        if (parseFloat(amount) > sourceAccount.balance) {
            Alert.alert("Ошибка", "Недостаточно средств на счете");
            return;
        }

        setLoading(true);
        try {
            const recipientAccount = await getAccountByNumber(recipientNumber);

            if (!recipientAccount) {
                Alert.alert("Ошибка", "Счет получателя не найден");
                return;
            }

            // Выполнение перевода
            await transferMoney({
                senderAccountID: sourceAccount.id,
                receiverAccountID: recipientAccount.id,
                amount: parseFloat(amount),
                currency: sourceAccount.currency
            });

            Alert.alert(
                "Успех",
                "Перевод выполнен успешно!",
                [{ text: "OK", onPress: () => navigation.navigate('Home', { refresh: true }) }]
            );
        } catch (error) {
            console.error(error);
            Alert.alert("Ошибка", "Не удалось выполнить перевод. Проверьте данные и попробуйте снова.");
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
                        <Text style={styles.title}>Перевод средств</Text>
                        <Text style={styles.subtitle}>Со счета: {formatAccountNumber(sourceAccount.accountNumber)}</Text>
                        <Text style={styles.balanceText}>Доступно: {sourceAccount.balance} {sourceAccount.currency}</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Номер счета получателя</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="card-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Введите номер счета"
                                    placeholderTextColor={theme.textSecondary}
                                    value={formatAccountNumber(recipientNumber)}
                                    onChangeText={handleRecipientNumberChange}
                                    keyboardType="numeric"
                                    maxLength={19}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Сумма перевода</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="cash-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="0.00"
                                    placeholderTextColor={theme.textSecondary}
                                    value={amount}
                                    onChangeText={setAmount}
                                    keyboardType="decimal-pad"
                                />
                                <Text style={styles.currencyBadge}>{sourceAccount.currency}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleTransfer}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={theme.background} />
                            ) : (
                                <>
                                    <Ionicons name="send" size={20} color={theme.background} style={{ marginRight: 10 }} />
                                    <Text style={styles.buttonText}>Подтвердить перевод</Text>
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
        shadowColor: theme.textSecondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
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
    balanceText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.primary,
        marginTop: 5,
    },
    form: {
        marginTop: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.text,
        marginBottom: 8,
        marginLeft: 4,
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
        marginTop: 20,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
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
