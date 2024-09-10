import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'trending-up' : 'trending-up-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tv"
        options={{
          title: 'Tv Shows',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
            name={focused ? 'tv' : 'tv-outline'} // Use TabBarIcon with 'tv' and 'tv-outline'
            color={color}
          />
          ),
        }}
      />
      
    </Tabs>
  );
}
