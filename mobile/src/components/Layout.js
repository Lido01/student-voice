import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Navbar from '../screens/Navbar';

const Layout = ({ children, title, navigation, user, onNotificationPress }) => {
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

const styles = StyleSheet.create({
  externalWrapper: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    // Prevents content from jumping on Android due to status bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { 
    flex: 1, 
  },
  content: { 
    flex: 1, 
    width: '100%',          // Force full width
    alignItems: 'stretch',   // Force children to stretch horizontally
  }
});

export default Layout;
Layout.displayName = 'Layout';
