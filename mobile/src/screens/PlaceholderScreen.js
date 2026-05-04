import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PlaceholderScreen = ({ navigation, route }) => {
  const title = route?.params?.title || 'Coming Soon';
  const description = route?.params?.description || 'This section is still being built out for a future release.';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.note}>Use the back button to return to the app.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9fafd',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2f3542',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#57606f',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  note: {
    fontSize: 13,
    color: '#a4b0be',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#4834d4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default PlaceholderScreen;
