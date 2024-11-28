import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './tabs/homeScreen';
import ClockWorkScreen from './tabs/clockworkScreen';
import GenAIscreen from './tabs/genAIscreen';
import SettingScreen from './tabs/settingScreen';
import { ICONS } from '../assets/icons';

// Create Tab Navigator
const Tab = createBottomTabNavigator();

// Helper function for rendering icons
const renderTabIcon = (icon, focused) => (
  <Image
    source={icon}
    style={{
      height: 30,
      width: 30,
      tintColor: focused ? 'black' : 'grey',
    }}
    resizeMode="contain"
  />
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#f8f9fa' },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
          tabBarIcon: ({ focused }) => {
            const icons = {
              Home: ICONS.home,
              ClockWork: ICONS.clockwork,
              AI: ICONS.ailogo,
              Settings: ICONS.settings,
            };
            return renderTabIcon(icons[route.name], focused);
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="ClockWork" component={ClockWorkScreen} options={{ title: 'Clock Work' }} />
        <Tab.Screen name="AI" component={GenAIscreen} options={{ title: 'AI' }} />
        <Tab.Screen name="Settings" component={SettingScreen} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});