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
        handlePress={() => router.push('/sign-in')} //after navigate to sign in page. Now, if you want to look signup page then press on the Sign Up link. Now you redirected to Sign Up page
      />
      <CustomButton
        title="Continue without Login"
        handlePress={() => router.push('/home')} //after navigate to sign in page. Now, if you want to look signup page then press on the Sign Up link. Now you redirected to Sign Up page
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
