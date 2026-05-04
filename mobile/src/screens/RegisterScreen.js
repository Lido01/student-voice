import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

import { register } from '../api/api';

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

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

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
      <TextInput style={styles.input} placeholder="Username" value={form.username} onChangeText={v => handleChange('username', v)} autoCapitalize="none" autoCorrect={false} />
      <TextInput style={styles.input} placeholder="Email" value={form.email} onChangeText={v => handleChange('email', v)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="User ID" value={form.user_id} onChangeText={v => handleChange('user_id', v)} autoCapitalize="none" autoCorrect={false} />
      <TextInput style={styles.input} placeholder="Role (student, admin, department, student_affairs)" value={form.role} onChangeText={v => handleChange('role', v)} autoCapitalize="none" autoCorrect={false} />
      <TextInput style={styles.input} placeholder="Password" value={form.password} onChangeText={v => handleChange('password', v)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={form.password2} onChangeText={v => handleChange('password2', v)} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#273c75',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#44bd32',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#487eb0',
    fontSize: 16,
    marginTop: 10,
  },
});

export default RegisterScreen;
