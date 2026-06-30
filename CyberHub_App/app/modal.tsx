// File: app/modal.tsx
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Important Information</Text>
      
      <View style={styles.separator} />
      
      <Text style={styles.text}>
        This is a placeholder for your CyberHub Terms of Service or Appliance Repair guidelines. 
        You can dynamically pass data here later!
      </Text>

      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>Got it, Close</Text>
      </TouchableOpacity>
      
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 25, backgroundColor: '#ffffff' },
  title: { fontSize: 24, fontWeight: '800', color: '#2f3542', textAlign: 'center' },
  separator: { marginVertical: 20, height: 2, width: '30%', backgroundColor: '#00a8ff', borderRadius: 5 },
  text: { fontSize: 16, color: '#747d8c', textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  closeButton: { backgroundColor: '#f1f2f6', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  closeButtonText: { fontSize: 16, fontWeight: '600', color: '#2f3542' }
});