import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { Link } from 'expo-router';
import CustomButton from '../components/CustomButton';
import React from 'react';
import logo from '../assets/images/manobalLogo.png';
import background from '../assets/images/g2.webp';
import mainImage from "../assets/images/front.png"

export default function App() {
  return (
  <ImageBackground
  source={background} style={styles.background} resizeMode="cover"
  >
      <View style={styles.container}>
      <View style={styles.topBox}>
      <Text style={styles.textStyle}>Hi Everyone,</Text>
      <Text style={styles.textStyle}>Welcome to <Text style={styles.boldName}>Manobal</Text></Text>
      </View>
      <View style={styles.bs1}>
        <Image source={mainImage} style={styles.logo} />
      </View>
      <View style={styles.bs2}>
        <CustomButton
          containerStyles={styles.btn}
          textStyles={styles.btnText}
          title="Get Started >"
          handlePress={() => router.push('/sign-in')}
        />
      </View>
      <View style={styles.bs2}>
        <CustomButton
          containerStyles={styles.btn}
          textStyles={styles.btnText}
          title="Continue without Login"
          handlePress={() => router.push('/home')}
        />
      </View>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'contain' depending on your need
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'transparent',
  },
  bs1: {
    // shadowColor: '#000', // Shadow color
    // shadowOffset: { width: 0, height: 4 }, // Shadow offset
    // shadowOpacity: 0.3, // Shadow opacity
    // shadowRadius: 4, // Shadow blur radius
    // elevation: 5, // Elevation for Android
    // borderRadius: 125, // Matches the image's borderRadius for rounded corners
    padding: 6, // Adds some space for shadow visibility
    marginBottom: 30,
  },
  logo: {
    height: 350,
    width:350, // Rounded corners (half of width/height for circle)
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
  textStyle:{
     fontFamily: 'Roboto',
    fontSize:30,
    textAlign:'center',
    fontWeight:800,
    color:'#0056D2'
  },
  topBox:{
    paddingBottom:24
  },
  boldName:{
    fontSize:35,
    fontFamily:"System",
    color:'#0056D2',
    fontWeight:900
  }
});
