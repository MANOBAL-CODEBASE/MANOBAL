import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { Link } from 'expo-router';
import CustomButton from '../components/CustomButton';
import React from 'react';
import './global.css';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Continue with Email"
        handlePress={() => router.push('/sign-in')} 
      />
      <CustomButton
        title="Continue without Login"
        handlePress={() => router.push('/home')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
