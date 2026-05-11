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

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // New States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [recentUsers, setRecentUsers] = useState([]);

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
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input with Visibility Toggle */}
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Password"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#273c75',
    marginBottom: 20,
  },
  suggestionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  suggestionTitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#dcdde1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    color: '#2f3640',
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
  passwordWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdde1',
    marginBottom: 20,
  },
  eyeButton: {
    padding: 10,
    marginRight: 5,
  },
  eyeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#487eb0',
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
    borderColor: '#487eb0',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#487eb0',
  },
  rememberText: {
    color: '#2f3640',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#487eb0',
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
  error: {
    color: '#e84118',
    marginBottom: 10,
    fontSize: 16,
  },
});
