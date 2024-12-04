import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { Link } from 'expo-router';
import CustomButton from '../components/CustomButton';
import React from 'react';
import logo from '../assets/images/manobalLogo.png';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.bs1}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.bs2}>
        <CustomButton
          containerStyles={styles.btn}
          textStyles={styles.btnText}
          title="Continue with Email"
          handlePress={() => router.push('/sign-in')}
        />
      </View>
      {/* <CustomButton
        title="Continue with Plan"
        handlePress={() => router.push('/plan')} 
      /> */}
      <View style={styles.bs2}>
        <CustomButton
          containerStyles={styles.btn}
          textStyles={styles.btnText}
          title="Continue without Login"
          handlePress={() => router.push('/home')}
        />
      </View>
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
  bs1: {
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Elevation for Android
    backgroundColor: '#fff', // Required for shadow visibility
    borderRadius: 125, // Matches the image's borderRadius for rounded corners
    padding: 6, // Adds some space for shadow visibility
    marginBottom: 100,
  },
  logo: {
    height: 250,
    width: 250,
    borderRadius: 125, // Rounded corners (half of width/height for circle)
  },
  btn: {
    width: 270,
    marginVertical: 7,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 500,
  },
  bs2: {
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 10, // Shadow blur radius
    borderRadius: 10,
  },
});
