import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const Plan = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 7, label: 'Option 7' },
    { id: 14, label: 'Option 14' },
    { id: 21, label: 'Option 21' },
    { id: 28, label: 'Option 28' },
  ];

  const handleSelect = (id) => {
    setSelectedOption(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Plan</Text>
      <View style={styles.cards}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.card,
              selectedOption === option.id && styles.selectedCard,
            ]}
            onPress={() => handleSelect(option.id)}
          >
            <Text
              style={[
                styles.cardText,
                selectedOption === option.id && styles.selectedCardText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title="Submit"
          handlePress={() => {
  Alert.alert(
    'Selected Option',
    selectedOption
      ? `You selected: ${options.find((opt) => opt.id === selectedOption)?.label}`
      : 'No option selected',
    [
      {
        text: 'OK',
        onPress: () => {
          router.push('/home');
        }
      }
    ]
  );
}}
        />
      </View>
    </View>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  cards: {
    width: '100%',
    marginBottom: 30,
  },
  card: {
    height: 70,
    backgroundColor: '#dcdcdc',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#6a5acd',
    borderColor: '#fff',
    borderWidth: 2,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  selectedCardText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
