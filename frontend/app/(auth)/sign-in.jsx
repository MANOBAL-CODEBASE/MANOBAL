<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { tailwind } from 'tailwindcss-react-native';
=======
import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simple validation and login function
  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    // Here you can integrate your authentication logic (e.g., API call to check user credentials)
    Alert.alert('Login Successful');
  };
>>>>>>> fd11d6d932cf106ea0a2fed38566d35a83bbce4a

  return (
<<<<<<< HEAD
    <View style={tailwind('flex-1 justify-center items-center')}>
      <Text style={tailwind('text-lg font-bold m-3')}>SignIn Page</Text>
      <Text style={tailwind('text-base mb-2')}>Email</Text>
      <Text style={tailwind('text-base mb-2')}>Password</Text>
      <Text style={tailwind('text-sm')}>Don't have an account?</Text>
      <Link href="/sign-up" style={tailwind('text-blue-500 underline')}>
        Sign Up
      </Link>
=======
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text onPress={()=>{router.push('/sign-up')}} style={styles.footerText}>Don't have an account? Sign up</Text>
>>>>>>> fd11d6d932cf106ea0a2fed38566d35a83bbce4a
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#007bff',
  },
});

export default LoginScreen;