import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007bff', // Customize the primary color
    background: '#ffffff',
    text: '#000000',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#007bff', // Customize the primary color
    background: '#121212',
    text: '#ffffff',
  },
};

export { lightTheme, darkTheme };