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
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(''); 

  // Function to calculate password strength dynamically
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1; // Accepts ANY special character/symbol

    if (pass.length === 0) return { width: '0%', color: 'transparent', label: '' };
    if (score <= 2) return { width: '33%', color: '#ff4757', label: 'Weak' }; 
    if (score === 3) return { width: '66%', color: '#ffa502', label: 'Normal' }; 
    return { width: '100%', color: '#2ed573', label: 'Strong' }; 
  };

  const strength = getPasswordStrength(password);

  const onRegisterPress = async () => {
    // 1. Empty Check
    if (!email || !password || !confirmPassword || !fullName || !phone || !gender) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    // 2. Email Format Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // 3. Strict Password Format Check (1 Capital, 1 Number, 1 Symbol, Min 8 chars)
    // The [^A-Za-z0-9] ensures ANY symbol is accepted
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Weak Password", 
        "Password must be at least 8 characters and contain at least 1 uppercase letter, 1 number, and 1 symbol."
      );
      return;
    }

    // 4. Confirm Password Match Check
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please try again.");
      return;
    }

    // 5. Phone Number Check
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-11 digit phone number.");
      return;
    }

    setIsLoading(true);
    const result = await registerUser(email, password, fullName, phone, gender); 
    
    if (result.success) {
      Alert.alert("Success", result.message);
      setIsLogin(true); 
      setPassword(''); 
      setConfirmPassword('');
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
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

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
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
          
          {/* 1. Full Name (Only visible during Registration, moved to TOP) */}
          {!isLogin && (
            <TextInput 
              style={styles.input} 
              placeholder="Full Name" 
              placeholderTextColor="#a4b0be"
              value={fullName} 
              onChangeText={setFullName} 
              autoCorrect={false}
            />
          )}

          {/* 2. Email Address (Shared between Login and Register) */}
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="#a4b0be"
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none" 
            keyboardType="email-address" 
            autoCorrect={false}
          />

          {/* 3. Phone and Gender (Only visible during Registration) */}
          {!isLogin && (
            <>
              <TextInput 
                style={styles.input} 
                placeholder="Phone Number (e.g. 0123456789)" 
                placeholderTextColor="#a4b0be"
                value={phone} 
                onChangeText={setPhone} 
                keyboardType="phone-pad" 
              />

              <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Gender</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity 
                    style={[styles.radioOption, gender === 'Male' && styles.radioOptionSelected]} 
                    onPress={() => setGender('Male')}
                  >
                    <Text style={[styles.radioText, gender === 'Male' && styles.radioTextSelected]}>Male</Text>
                  </TouchableOpacity>
                  
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
          
          {/* 4. Password (Shared between Login and Register) */}
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#a4b0be"
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false} 
            autoComplete="off" 
            textContentType="none"
          />

          {/* Dynamic Password Strength Indicator (Only visible during Registration) */}
          {!isLogin && password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBarBackground}>
                <View 
                  style={[
                    styles.strengthBarFill, 
                    { width: strength.width as any, backgroundColor: strength.color }
                  ]} 
                />
              </View>
              <Text style={[styles.strengthLabel, { color: strength.color }]}>
                {strength.label}
              </Text>
            </View>
          )}

          {/* 5. Confirm Password (Only visible during Registration) */}
          {!isLogin && (
            <TextInput 
              style={styles.input} 
              placeholder="Confirm Password" 
              placeholderTextColor="#a4b0be"
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
              secureTextEntry 
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false} 
              autoComplete="off" 
              textContentType="none"
            />
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

        <TouchableOpacity onPress={toggleAuthMode} style={styles.switchButton}>
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
  
  // Dynamic Strength Bar Styles
  strengthContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: -8, paddingHorizontal: 5 },
  strengthBarBackground: { flex: 1, height: 6, backgroundColor: '#dfe4ea', borderRadius: 3, overflow: 'hidden', marginRight: 10 },
  strengthBarFill: { height: '100%', borderRadius: 3 },
  strengthLabel: { fontSize: 12, fontWeight: 'bold', width: 45, textAlign: 'right' },

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
  radioOptionSelected: { borderColor: '#00a8ff', backgroundColor: '#e3f6ff' },
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
    elevation: 5 
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
  switchButton: { marginTop: 30, alignItems: 'center', padding: 10 },
  switchText: { color: '#2f3542', fontSize: 15, fontWeight: '500' }
});