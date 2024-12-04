import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const chats = () => {
  return (
    <View style={styles.container}>
      <Text >Chats</Text>
    </View>
  )
}

export default chats

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})