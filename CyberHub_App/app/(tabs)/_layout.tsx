// File: app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: '#00a8ff', 
        tabBarInactiveTintColor: '#a4b0be', 
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f2f6',
          elevation: 5, 
        },
      }}>
      
      {/* 1. Auth (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarStyle: { display: 'none' }, 
          href: null, 
        }}
      />

      {/* 2. Dashboard  */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />

      {/* 3. Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}