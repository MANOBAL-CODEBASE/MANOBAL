import { StyleSheet, Text, View } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import Home from './home';
import {Stack, Screen} from 'expo-router';


const TabsLayout = () => {
  return (
    <>
      {/* <Tabs>
        <Tabs.Screen
          name="home"
          options={{ title: 'Home', headerShown:  false}}
        />
      </Tabs> */}
      {/* <Home/> */}

      <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="tasks" options={{ headerShown: false }} />
      
    </Stack>
    </>
    
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
