// File: app/(tabs)/index.tsx
// Purpose: Main UI component for the Login and Registration screens.

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { registerUser, loginUser } from '../../services/authService'; // Import our modular backend functions

export default function AuthScreen() {
  // State Management for UI Toggle
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // State Management for User Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Handler for Registration Button
  const onRegisterPress = async () => {
    // Input Validation
    if (!email || !password || !fullName || !phone) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    
    // Call the modularized function from authService.js
    const result = await registerUser(email, password, fullName, phone);
    
    if (result.success) {
      Alert.alert("Success", result.message);
      setIsLogin(true); // Automatically switch to login screen upon success
    } else {
      Alert.alert("Registration Failed", result.message);
    }
    
    setIsLoading(false);
  };

  // Handler for Login Button
  const onLoginPress = async () => {
    // Input Validation
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    
    // Call the modularized function from authService.js
    const result = await loginUser(email, password);
    
    if (result.success) {
      Alert.alert("Welcome!", `Login successful. User ID: ${result.userId}`);
      // Future Todo: Navigate the user to the actual application dashboard here
    } else {
      Alert.alert("Login Failed", result.message);
    }
    
    setIsLoading(false);
  };

  // UI Rendering
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>CyberHub</Text>
      <Text style={styles.subTitle}>{isLogin ? 'Welcome Back (Login)' : 'Create an Account (Register)'}</Text>

      {/* Shared Inputs for both Login and Register */}
      <TextInput 
        style={styles.input} 
        placeholder="Email Address" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
        keyboardType="email-address" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password (Min. 6 characters)" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      {/* Conditional Inputs specifically for Registration */}
      {!isLogin && (
        <>
          <TextInput 
            style={styles.input} 
            placeholder="Full Name" 
            value={fullName} 
            onChangeText={setFullName} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Phone Number (e.g. 0123456789)" 
            value={phone} 
            onChangeText={setPhone} 
            keyboardType="phone-pad" 
          />
        </>
      )}

      {/* Main Action Button */}
      <TouchableOpacity 
        style={styles.mainButton} 
        onPress={isLogin ? onLoginPress : onRegisterPress}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
        </Text>
      </TouchableOpacity>

      {/* Toggle UI Text Button */}
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign up here." : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styling definitions
const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f6fa' },
  headerTitle: { fontSize: 36, fontWeight: 'bold', color: '#2f3640', textAlign: 'center', marginBottom: 10 },
  subTitle: { fontSize: 18, color: '#7f8fa6', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#dcdde1', fontSize: 16 },
  mainButton: { backgroundColor: '#00a8ff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  switchText: { color: '#00a8ff', textAlign: 'center', fontSize: 16, fontWeight: '500' }
});