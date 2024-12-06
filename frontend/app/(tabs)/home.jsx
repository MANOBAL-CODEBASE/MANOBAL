import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const Dashboard = () => {
  const progress = 57; // Example progress value
  const strokeDasharray = 2 * Math.PI * 40; // Circle circumference
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Hi, Prince!</Text>
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

      {/* Info Section */}
      <View style={styles.infoGrid}>
        <View style={styles.infoBox}>
          <FontAwesome5 name="calendar-alt" size={24} color="#ff5c5c" />
          {/* <FontAwesomeIcon icon="fa-duotone fa-solid fa-calendar" /> */}

          <Text style={styles.infoText}>7 days</Text>
          <Text style={styles.infoValue}>Plan</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="calendar-alt" size={24} color="#ff7f50" />
          <Text style={styles.infoText}>14 days</Text>
          <Text style={styles.infoValue}>Plan</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="calendar-alt" size={24} color="#ffa500" />
          <Text style={styles.infoText}>21 days</Text>
          <Text style={styles.infoValue}>Plan</Text>
        </View>
        <View style={styles.infoBox}>
          <FontAwesome5 name="calendar-alt" size={24} color="#4caf50" />
          <Text style={styles.infoText}>28 days</Text>
          <Text style={styles.infoValue}>Plan</Text>
        </View>
      </View>
      <CustomButton
        title="Go to Assessment"
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
