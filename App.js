import { NavigationContainer } from '@react-navigation/native';
import NavegacaoPrincipal from './routes/NavegacaoPrincipal';
import { EventoProvider } from './contexts/EventoContext';
import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AuthProvider from './contexts/AuthContext';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9400d3',
    accent: '#e0190d',
  },
};

const App = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <EventoProvider>
          <NavigationContainer>
            <NavegacaoPrincipal />
          </NavigationContainer>
        </EventoProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;
