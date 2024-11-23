import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

const SignIn = () => {
  return (
    <View>
      <Text>SignIn Page</Text>
      <Text> Don't have an account?</Text>
      <Link href="/sign-up"> Sign Up</Link>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
