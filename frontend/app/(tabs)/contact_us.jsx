import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const contact = () => {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");
  const [comment, setComment] = useState("");

  const submitFeedback = () => {
    if (!rating || !feedbackType) {
      Alert.alert("Error", "Please provide a rating and select feedback type.");
      return;
    }

    const feedbackData = {
      rating,
      feedbackType,
      comment,
    };

    // Handle form submission logic here
    console.log("Feedback Submitted:", feedbackData);
    Alert.alert("Thank You!", "Your feedback has been submitted.");
    // Reset form
    setRating(0);
    setFeedbackType("");
    setComment("");
  };

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setRating(index + 1)}
          style={{ marginHorizontal: 2 }}
        >
          <Ionicons
            name={index < rating ? "star" : "star-outline"}
            size={30}
            color="#f4b400"
          />
        </TouchableOpacity>
      ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>

      {/ Star Rating /}
      <Text style={styles.label}>Rate Us:</Text>
      <View style={styles.starContainer}>{renderStars()}</View>

      {/ Feedback Type /}
      <Text style={styles.label}>Feedback Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={feedbackType}
          onValueChange={(itemValue) => setFeedbackType(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Bug Report" value="bug" />
          <Picker.Item label="Feature Request" value="feature" />
          <Picker.Item label="General Feedback" value="general" />
        </Picker>
      </View>

      {/ Additional Comments /}
      <Text style={styles.label}>Comments:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your comments here..."
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {/ Submit Button /}
      <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default contact;