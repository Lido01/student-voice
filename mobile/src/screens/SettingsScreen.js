import React from 'react';
import { Switch, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const SettingsScreen = () => {
  const { isDarkMode, setDarkMode, theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Preferences</Text>

      <View style={styles.settingRow}>
        <View style={styles.settingIcon}>
          <Feather name={isDarkMode ? 'moon' : 'sun'} size={22} color={theme.primary} />
        </View>
        <View style={styles.settingCopy}>
          <Text style={styles.settingTitle}>Dark mode</Text>
          <Text style={styles.settingDescription}>
            Use a darker background across the app.
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={isDarkMode ? theme.surface : '#ffffff'}
        />
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    heading: {
      color: theme.text,
      fontSize: 22,
      fontWeight: '800',
      marginBottom: 18,
    },
    settingRow: {
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderColor: theme.cardBorder,
      borderRadius: 14,
      borderWidth: 1,
      flexDirection: 'row',
      padding: 16,
    },
    settingIcon: {
      alignItems: 'center',
      backgroundColor: theme.surfaceAlt,
      borderRadius: 12,
      height: 44,
      justifyContent: 'center',
      marginRight: 14,
      width: 44,
    },
    settingCopy: {
      flex: 1,
      paddingRight: 12,
    },
    settingTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '700',
    },
    settingDescription: {
      color: theme.mutedText,
      fontSize: 13,
      marginTop: 4,
    },
  });

export default SettingsScreen;
SettingsScreen.displayName = 'SettingsScreen';
