import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext'
import Ajustes from '../screens/Ajustes';
import BuscarEventos from '../screens/BuscarEventos';
import Register from '../screens/Register';
import CriarEventos from '../screens/CriarEventos';
import DetalhesEventos from '../screens/DetalhesEventos';
import RecoverPassword from '../screens/RecoverPassword';
import Login from '../screens/Login';
import MeusEventos from '../screens/MeusEventos';

const Stack = createNativeStackNavigator();

const NavegacaoPrincipal = () => {
  
   const { usuario } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!usuario.logado ? (
          <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      </>
      ) : (
      <Stack.Screen name="Buscar Eventos" component={BuscarEventos} />
      )}
      <Stack.Screen name="Ajustes" component={Ajustes} />
      <Stack.Screen name="Criar Eventos" component={CriarEventos} />
      <Stack.Screen name="Detalhes do Evento" component={DetalhesEventos} />
      <Stack.Screen name="Meus Eventos" component={MeusEventos} />
    </Stack.Navigator>
  );
};

export default NavegacaoPrincipal;
