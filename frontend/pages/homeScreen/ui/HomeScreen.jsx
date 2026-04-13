import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardsList from '../../../widgets/cardsList';
import { useTheme } from '../../../shared/lib/themes/ThemeContext';
import TopBar from '../../../widgets/topBar/ui/TopBar';
import OperationsList from '../../../widgets/operationsList'

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar name = 'Анна' />
      <CardsList />
      <OperationsList />
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  }
});