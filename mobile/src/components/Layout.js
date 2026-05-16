// Shared screen layout wrapper that keeps navigation and page chrome consistent.
import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Navbar from '../screens/Navbar';
import { useTheme } from '../theme/ThemeContext';

const Layout = ({ children, title, navigation, user, onNotificationPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleLogout = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
      return;
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    // We use a View wrapper around SafeAreaView to ensure background color is consistent
    <View style={styles.externalWrapper}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.surface} />
      <SafeAreaView style={styles.container}>
        <Navbar 
          title={title} 
          user={user}
          onNotificationPress={onNotificationPress} 
          onLogoutPress={handleLogout}
          onMenuSelect={(key) => navigation.navigate(key)}
        />
        {/* We add alignItems: 'stretch' to force children to full width */}
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    externalWrapper: {
      flex: 1,
      backgroundColor: theme.background,
      // Prevents content from jumping on Android due to status bar
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      width: '100%',          // Force full width
      alignItems: 'stretch',   // Force children to stretch horizontally
      backgroundColor: theme.background,
    }
  });

export default Layout;
Layout.displayName = 'Layout';
