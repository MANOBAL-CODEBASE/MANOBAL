import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const contact_us = () => {
  return (
    <View style={styles.container}>
      <Text>Contact Us</Text>
    </View>
  )
}

export default contact_us

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})