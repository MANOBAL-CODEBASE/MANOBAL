import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import mainService from '../services/mainService';

const Dashboard = () => {
  //const progress = 57; // Example progress value
  const strokeDasharray = 2 * Math.PI * 40; // Circle circumference
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;
  const [user,setUser] = useState({});
  const [progress, setProgress] = useState(0);
  const getUser = async()=>{
   try {
    const user = await mainService.getUser();
    setUser(user);
   } catch (error) {
    console.error('Error fetching user:', error);
   }
  }
  const getScore = async()=>{
    try {
      const scores = await mainService.getScore();
      const values = Object.values(scores); // reduce object to array
      let sum =0;
      values.forEach((value)=>{
         sum += value;
      })
      setProgress(sum*4);
    } catch (error) {
      console.error('Error fetching score:', error);
      
    }
  }
  useEffect(()=>{
    getUser();
    getScore();
  },[] );
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Hi {user.name} </Text>
        <Text style={styles.date}>Tue, 2 Dec</Text>
        <FontAwesome5 name="bell" size={20} color="black" style={styles.icon} />
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Performance</Text>

        <Svg width="100" height="100" style={styles.progressCircle}>
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#222"
            strokeWidth="10"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#007bff"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>


      <CustomButton
        title="Give Assessment Again"
        handlePress={() => router.push('/assessment')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 22,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  nameDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    color: '#555',
  },
  icon: {
    marginLeft: 10,
  },
  progressSection: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#c5d6fc',
    borderRadius: 10,
    padding: 20,
    marginBottom :20
  },
  progressTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  progressDetails: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  blueText: {
    color: '#007bff',
  },
  subText: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  progressCircle: {
    marginTop: 5,
  },
  progressText: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    top: 95,
    left: 167,
  },
  infoGrid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoBox: {
    width: '45%',
    backgroundColor: '#c5d6fc',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a0a0a0',
  },
});

export default Dashboard;
