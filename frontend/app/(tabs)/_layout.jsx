import { StyleSheet, Text, View } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{ title: 'Home', headerShown: false }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: 'Profile', headerShown: false }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
