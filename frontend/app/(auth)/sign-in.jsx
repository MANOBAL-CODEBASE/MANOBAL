import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { tailwind } from 'tailwindcss-react-native';

const SignIn = () => {
  return (
    <View style={tailwind('flex-1 justify-center items-center')}>
      <Text style={tailwind('text-lg font-bold m-3')}>SignIn Page</Text>
      <Text style={tailwind('text-base mb-2')}>Email</Text>
      <Text style={tailwind('text-base mb-2')}>Password</Text>
      <Text style={tailwind('text-sm')}>Don't have an account?</Text>
      <Link href="/sign-up" style={tailwind('text-blue-500 underline')}>
        Sign Up
      </Link>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
