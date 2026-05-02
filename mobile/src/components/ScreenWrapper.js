import React from 'react';
import { 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

const ScreenWrapper = ({ children }) => {
  return (
    // SafeAreaView prevents content from going under the status bar/notch
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled" // Closes keyboard when tapping buttons
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set your app's default background color
  },
  scrollContent: {
    flexGrow: 1, // Ensures content can fill the screen or scroll if longer
    padding: 20, // Global padding for all screens
  },
});

export default ScreenWrapper;
