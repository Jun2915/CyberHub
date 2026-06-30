// File: app/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { registerUser, loginUser } from '../../services/authService'; 

export default function AuthScreen() {
  // UI State
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(''); 

  const onRegisterPress = async () => {
    if (!email || !password || !fullName || !phone || !gender) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    const result = await registerUser(email, password, fullName, phone, gender); 
    
    if (result.success) {
      Alert.alert("Success", result.message);
      setIsLogin(true); 
    } else {
      Alert.alert("Registration Failed", result.message);
    }
    setIsLoading(false);
  };

  const onLoginPress = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    const result = await loginUser(email, password);
    
    if (result.success) {
      Alert.alert("Welcome!", `Login successful. User ID: ${result.userId}`);
    } else {
      Alert.alert("Login Failed", result.message);
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>CyberHub</Text>
          <Text style={styles.subTitle}>{isLogin ? 'Sign in to continue' : 'Create a new account'}</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="#a4b0be"
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none" 
            keyboardType="email-address" 
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Password (Min. 6 characters)" 
            placeholderTextColor="#a4b0be"
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />

          {!isLogin && (
            <>
              <TextInput 
                style={styles.input} 
                placeholder="Full Name" 
                placeholderTextColor="#a4b0be"
                value={fullName} 
                onChangeText={setFullName} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Phone Number (e.g. 0123456789)" 
                placeholderTextColor="#a4b0be"
                value={phone} 
                onChangeText={setPhone} 
                keyboardType="phone-pad" 
              />

              {/* Gender Selection Radio Buttons */}
              <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Gender</Text>
                <View style={styles.radioGroup}>
                  {/* Male Button */}
                  <TouchableOpacity 
                    style={[styles.radioOption, gender === 'Male' && styles.radioOptionSelected]} 
                    onPress={() => setGender('Male')}
                  >
                    <Text style={[styles.radioText, gender === 'Male' && styles.radioTextSelected]}>Male</Text>
                  </TouchableOpacity>
                  
                  {/* Female Button */}
                  <TouchableOpacity 
                    style={[styles.radioOption, gender === 'Female' && styles.radioOptionSelected]} 
                    onPress={() => setGender('Female')}
                  >
                    <Text style={[styles.radioText, gender === 'Female' && styles.radioTextSelected]}>Female</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={isLogin ? onLoginPress : onRegisterPress}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.switchButton}>
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 25, backgroundColor: '#ffffff' },
  headerContainer: { marginBottom: 40, alignItems: 'center' },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#1e272e', marginBottom: 8, letterSpacing: 1 },
  subTitle: { fontSize: 16, color: '#747d8c' },
  formContainer: { width: '100%' },
  input: { 
    backgroundColor: '#f1f2f6', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    borderRadius: 12, 
    marginBottom: 16, 
    fontSize: 16,
    color: '#2f3542'
  },
  
  // Radio Button Styles
  radioContainer: { marginBottom: 20 },
  radioLabel: { fontSize: 14, color: '#747d8c', marginBottom: 8, marginLeft: 4, fontWeight: '600' },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  radioOption: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#dfe4ea',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#ffffff'
  },
  radioOptionSelected: {
    borderColor: '#00a8ff',
    backgroundColor: '#e3f6ff'
  },
  radioText: { fontSize: 16, color: '#a4b0be', fontWeight: '600' },
  radioTextSelected: { color: '#00a8ff', fontWeight: '700' },

  mainButton: { 
    backgroundColor: '#00a8ff', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    shadowColor: '#00a8ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5 // 安卓阴影
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  switchButton: { marginTop: 30, alignItems: 'center', padding: 10 },
  switchText: { color: '#2f3542', fontSize: 15, fontWeight: '500' }
});