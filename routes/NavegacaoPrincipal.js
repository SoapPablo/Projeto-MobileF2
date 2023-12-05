import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';

import Cadastro from '../screens/Register';
import DetalhesEventos from '../screens/DetalhesEventos';
import EsqueceuSenha from '../screens/EsqueceuSenha';
import Login from '../screens/Login';
import BuscarEventos from '../screens/BuscarEventos';
import CriarEventos from '../screens/CriarEventos';
import Ajustes from '../screens/Ajustes';
import AppRoot from '../screens/MeusEventos';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavegacaoAba() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: 'purple',
        inactiveTintColor: 'purple',
        style: { backgroundColor: 'purple' },
      }}>
      <Tab.Screen
        name="Buscar Eventos"
        component={BuscarEventos}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={'purple'} />
          ),
        }}
      />
      <Tab.Screen
        name="Meus Eventos"
        component={AppRoot}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-alt" size={24} color="purple" />
          ),
        }}
      />
      <Tab.Screen
        name="Criar Eventos"
        component={CriarEventos}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={24} color={'purple'} />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={24} color="purple" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function NavegacaoPrincipal() {
  const { usuario } = useContext(AuthContext);

  return (
    <Stack.Navigator >
      {!usuario.logado ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Cadastro} />
          <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
        </>
      ) : (
        <>
          <Stack.Screen name="BuscarEventos" component={NavegacaoAba}/>
          <Stack.Screen name="CriarEventos" component={CriarEventos} />
          <Stack.Screen name="Ajustes" component={Ajustes} />
          <Stack.Screen name="Detalhes do Evento" component={DetalhesEventos} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default NavegacaoPrincipal;