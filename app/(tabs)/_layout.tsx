import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabLayout = () => {
  return (
    <Tabs
    // screenOptions={{
    //  headerShown: false,
    // }}
    >
      <Tabs.Screen
        name="CategoryScreen"
        options={{
          title: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'view-headline' : 'view-headline'}
              color={color}
              size={32}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',

          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={32}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="SignInScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-circle' : 'account-circle-outline'}
              color={color}
              size={32}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
