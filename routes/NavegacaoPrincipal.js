import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ajustes from '../screens/Ajustes';
import BuscarEventos from '../screens/BuscarEventos';
import Cadastro from '../screens/Cadastro';
import CriarEventos from '../screens/CriarEventos';
import DetalhesEventos from '../screens/DetalhesEventos';
import EsqueceuSenha from '../screens/EsqueceuSenha';
import Login from '../screens/Login';
import MeusEventos from '../screens/MeusEventos';

const Stack = createNativeStackNavigator();

const NavegacaoPrincipal = () => {
  return (
    <Stack.Navigator initialRouteName='Buscar Eventos'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Esqueceu sua Senha" component={EsqueceuSenha} />
      <Stack.Screen name="Ajustes" component={Ajustes} />
      <Stack.Screen name="Buscar Eventos" component={BuscarEventos} />
      <Stack.Screen name="Criar Eventos" component={CriarEventos} />
      <Stack.Screen name="Detalhes do Evento" component={DetalhesEventos} />
      <Stack.Screen name="Meus Eventos" component={MeusEventos} />
    </Stack.Navigator>
  );
};

export default NavegacaoPrincipal;
