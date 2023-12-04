import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const Ajustes = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleRedefinirSenha = () => {
    console.log('Redefinir Senha');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/avatares/avatar-icon.png')}
        style={styles.imgPerfil}
      />

      <Text style={styles.textNome}>Nome do usuário</Text>

      <TouchableOpacity style={styles.smallButton}>
        <Text style={styles.textButton}>Trocar foto de perfil</Text>
      </TouchableOpacity>

      <View style={styles.smallButtonContainer}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={handleRedefinirSenha}>
          <Text style={styles.textButton}>Trocar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton}>
          <Text style={styles.textButton}>Trocar nome</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
        <Text style={styles.textButton}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20%',
  },
  imgPerfil: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: '#a020f0',
    borderWidth: 3,
  },
  textNome: {
    fontSize: 30,
    color: '#a020f0',
    fontWeight: 'bold',
    paddingBottom: 50,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  smallButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  smallButton: {
    backgroundColor: '#a020f0',
    borderRadius: 10,
    margin: 10,
  },
  exitButton: {
    backgroundColor: '#a020f0',
    borderRadius: 10,
    margin: 10,
  },
});

export default Ajustes;
