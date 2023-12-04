import React, { useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { error, login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, senha);
      navigation.navigate('BuscarEventos');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleRecover = () => {
    navigation.navigate('EsqueceuSenha');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>Login</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          label="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {error}
          </Text>
        )}
        <Button mode="contained" onPress={handleLogin}>
          Entrar
        </Button>
        <Button onPress={handleRegister}>Não tenho conta</Button>
        <Button onPress={handleRecover}>Esqueceu a Senha</Button>
      </ScrollView>
    </View>
  );
};

export default Login;
