import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

import { register } from '../api/api';
import { useTheme } from '../theme/ThemeContext';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    role: '',
    user_id: '',
  });
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleChange = (name, value) => setForm({ ...form, [name]: value });
  const renderField = ({ name, label, placeholder, secureTextEntry = false, keyboardType = 'default' }) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.mutedText}
        value={form[name]}
        onChangeText={(value) => handleChange(name, value)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  const handleRegister = async () => {
    if (form.password !== form.password2) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        username: form.username.trim(),
        email: form.email.trim(),
        role: form.role.trim().toLowerCase() || 'student',
        user_id: form.user_id.trim(),
      };

      const result = await register(payload);
      if (result.status === 201) {
        Alert.alert('Success', 'Registration successful!');
        navigation.replace('Login');
      } else {
        Alert.alert('Registration Failed', JSON.stringify(result));
      }
    } catch (e) {
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {renderField({ name: 'username', label: 'Username', placeholder: 'Choose a username' })}
      {renderField({ name: 'email', label: 'Email address', placeholder: 'Enter your email address', keyboardType: 'email-address' })}
      {renderField({ name: 'user_id', label: 'User ID', placeholder: 'Enter your student or staff ID' })}
      {renderField({ name: 'role', label: 'Role', placeholder: 'student, admin, department, or student_affairs' })}
      {renderField({ name: 'password', label: 'Password', placeholder: 'Create a password', secureTextEntry: true })}
      {renderField({ name: 'password2', label: 'Confirm password', placeholder: 'Re-enter your password', secureTextEntry: true })}
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 30,
    },
    fieldGroup: {
      width: '100%',
      marginBottom: 16,
    },
    inputLabel: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 8,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: theme.surface,
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: theme.success,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 4,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    link: {
      color: theme.primary,
      fontSize: 16,
      marginTop: 10,
    },
  });

export default RegisterScreen;
RegisterScreen.displayName = 'RegisterScreen';
