import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import mainService from '../services/mainService';
import {
  LineChart
} from "react-native-chart-kit";
import { Dimensions } from 'react-native';

const Dashboard = () => {
  const strokeDasharray = 2 * Math.PI * 40; // Circle circumference
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState([5,5,5,5,5,5]);

  const getUser = async () => {
    try {
      const user = await mainService.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getScore = async () => {
    try {
      const scores = await mainService.getScore();
      const values = Object.values(scores);
      setScore(values);
      const sum = values.reduce((acc, value) => acc + value, 0);
      setProgress(sum * 4);
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  };

  const getDate = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();

    const day = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];

    return `${day}, ${dd} ${month}`;
  };

  useEffect(() => {
    getUser();
    getScore();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.smallTitle}>Hi, <Text style={styles.boldName}>{user.name}</Text></Text>
        <Text style={styles.date}>{getDate()}</Text>
        <FontAwesome5 name="bell" size={20} color="black" style={styles.icon} />
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Overall Performance</Text>

        <Svg width="100" height="100" style={styles.progressCircle}>
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#d3d3d3"
            strokeWidth="10"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#007BFF"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDasharray - (progress / 100) * strokeDasharray}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      <View style={styles.barChart}>
      <Text style={[styles.progressTitle,styles.mb3]}>Individual Performance</Text>
        <LineChart
          data={{
            labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"],
            datasets: [
              {
                data: score
              }
            ]
          }}
          width={Dimensions.get("window").width - 35}
          height={280}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#f7f7f7",
            backgroundGradientFrom: "#e8f5e9",
            backgroundGradientTo: "#e8f5e9",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green shades
            labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
            style: {
              borderRadius: 5
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#66bb6a"
            }
          }}
          bezier
          style={styles.chartStyle}
          verticalLabelRotation={-60}
          xLabelsOffset={30}
        />
      </View>
      <CustomButton
        title="Give Assessment Again"
        handlePress={() => router.push('/assessment')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boldName: {
    fontSize: 35,
    fontFamily: 'System',
    color: '#0056D2',
    fontWeight: 900,
  },
  mb3:{
    marginBottom:10
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
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
  smallTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
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
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 28,
    color: '#333',
  },
  progressCircle: {
    marginTop: 5,
  },
  progressText: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    top: 95,
    left: 167,
  },
  chartStyle: {
    marginBottom:16,
    borderRadius: 16,
  },
  barChart:{
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  }
});

export default Dashboard;
