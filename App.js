import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNav from './screens/RootNav';

export default function App() {
  return (
    <SafeAreaProvider>

        <RootNav />
  
    </SafeAreaProvider>
  );
}