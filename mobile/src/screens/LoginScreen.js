// Login screen that authenticates users and restores remembered account details.
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/api';
import { useTheme } from '../theme/ThemeContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // New States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [recentUsers, setRecentUsers] = useState([]);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    loadRecentUsers();
    loadRememberedLogin();
  }, []);

  const loadRecentUsers = async () => {
    try {
      const savedUsers = await AsyncStorage.getItem('recentUsers');
      if (savedUsers) {
        setRecentUsers(JSON.parse(savedUsers));
      }
    } catch (e) {
      console.error("Failed to load users");
    }
  };

  const loadRememberedLogin = async () => {
    try {
      const savedRememberMe = await AsyncStorage.getItem('rememberMe');
      const savedUsername = await AsyncStorage.getItem('rememberedUsername');

      if (savedRememberMe === 'true') {
        setRememberMe(true);
      }

      if (savedUsername) {
        setUsername(savedUsername);
      }
    } catch (e) {
      console.error('Failed to load remembered login');
    }
  };

  const saveRecentUser = async (value) => {
    const normalized = value.trim();
    if (!normalized) {
      return;
    }

    const nextUsers = [normalized, ...recentUsers.filter((item) => item !== normalized)].slice(0, 5);
    setRecentUsers(nextUsers);
    await AsyncStorage.setItem('recentUsers', JSON.stringify(nextUsers));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await login(username, password);

      if (result.status === 200 && result.access) {
        await saveRecentUser(username);

        if (rememberMe) {
          await AsyncStorage.setItem('rememberMe', 'true');
          await AsyncStorage.setItem('rememberedUsername', username);
        } else {
          await AsyncStorage.multiRemove(['rememberMe', 'rememberedUsername']);
        }

        navigation.replace('MainNavigator', { 
          token: result.access,
          user: {
            username: result.username,
            fullname: result.fullname,
            role: result.role,
            email: result.email,
            user_id: result.user_id,
          },
          screen: 'Dashboard' 
        });
      } else {
        setError(result.detail || 'Invalid credentials');
      }
    } catch (e) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };


  const selectSuggestedUser = (user) => {
    setUsername(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Suggestion Chips */}
      {recentUsers.length > 0 && (
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>Recent logins:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentUsers.map((user, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.chip} 
                onPress={() => selectSuggestedUser(user)}
              >
                <Text style={styles.chipText}>{user}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Username Input */}
      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        placeholderTextColor={theme.mutedText}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input with Visibility Toggle */}
      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor={theme.mutedText}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { marginBottom: 0, flex: 1, borderWidth: 0 }]}
          autoCorrect={false}
        />
        <TouchableOpacity 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeButton}
        >
          <Text style={styles.eyeText}>{isPasswordVisible ? 'HIDE' : 'SHOW'}</Text>
        </TouchableOpacity>
      </View>

      {/* Remember Me Toggle */}
      <TouchableOpacity 
        style={styles.rememberRow} 
        onPress={() => setRememberMe(!rememberMe)}
      >
        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
        <Text style={styles.rememberText}>Remember me next time</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

LoginScreen.displayName = 'LoginScreen';

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 20,
    },
    suggestionContainer: {
      width: '100%',
      marginBottom: 20,
    },
    suggestionTitle: {
      fontSize: 12,
      color: theme.mutedText,
      marginBottom: 8,
    },
    chip: {
      backgroundColor: theme.surfaceAlt,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginRight: 8,
    },
    chipText: {
      fontSize: 14,
      color: theme.text,
    },
    inputLabel: {
      alignSelf: 'flex-start',
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
      marginBottom: 20,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
    },
    passwordWrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 20,
    },
    eyeButton: {
      padding: 10,
      marginRight: 5,
    },
    eyeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.primary,
    },
    rememberRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 25,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 4,
      marginRight: 10,
    },
    checkboxChecked: {
      backgroundColor: theme.primary,
    },
    rememberText: {
      color: theme.text,
      fontSize: 14,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: theme.primary,
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
      color: theme.primary,
      fontSize: 16,
      marginTop: 10,
    },
    error: {
      color: theme.danger,
      marginBottom: 10,
      fontSize: 16,
    },
  });
