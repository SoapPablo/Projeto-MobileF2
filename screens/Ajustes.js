import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Autenticacao';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Ajustes = ({ navigation }) => {
  const { logout, usuario } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  const handleRedefinirSenha = () => {
    // Lógica para redefinir senha
    console.log('Redefinir Senha');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRedefinirSenha}>
        <Text style={styles.buttonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Ajustes;
