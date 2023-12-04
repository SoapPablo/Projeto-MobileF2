import React, { useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

const Register = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmSenhaError, setConfirmSenhaError] = useState('');

  const { error, register } = useContext(AuthContext);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const validateInputs = () => {
    let isValid = true;

    if (!nome) {
      setNomeError('Nome é obrigatório.');
      isValid = false;
    } else {
      setNomeError('');
    }

    if (!email || !validateEmail(email)) {
      setEmailError('Campo email deve ser um email válido.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!senha || senha.length < 6) {
      setSenhaError('Campo senha deve ter pelo menos 6 caracteres.');
      isValid = false;
    } else {
      setSenhaError('');
    }

    if (senha !== confirmSenha) {
      setConfirmSenhaError('As senhas não coincidem.');
      isValid = false;
    } else {
      setConfirmSenhaError('');
    }

    return isValid;
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = () => {
    if (validateInputs()) {
      register(nome, email, senha);
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>Registrar</Text>
        <TextInput
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
          onBlur={() => setNomeError(nome ? '' : 'Campo nome é obrigatório.')}
        />
        {nomeError !== '' && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {nomeError}
          </Text>
        )}
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onBlur={() =>
            setEmailError(
              validateEmail(email)
                ? ''
                : 'Adicione um email valido "exemplo@gmail.com".'
            )
          }
          keyboardType="email-address"
        />
        {emailError !== '' && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {emailError}
          </Text>
        )}
        <TextInput
          label="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          onBlur={() =>
            setSenhaError(
              !senha || senha.length >= 6
                ? ''
                : 'A senha deve ter pelo menos 6 caracteres.'
            )
          }
        />
        {senhaError !== '' && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {senhaError}
          </Text>
        )}
        <TextInput
          label="Confirmar Senha"
          secureTextEntry={true}
          value={confirmSenha}
          onChangeText={(text) => setConfirmSenha(text)}
          onBlur={() =>
            setConfirmSenhaError(
              senha === confirmSenha ? '' : 'As senhas não coincidem.'
            )
          }
        />
        {confirmSenhaError !== '' && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {confirmSenhaError}
          </Text>
        )}
        {error && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {error}
          </Text>
        )}
        <Button mode="contained" onPress={handleRegister}>
          Registrar
        </Button>
        <Button onPress={handleLogin}>Voltar</Button>
      </ScrollView>
    </View>
  );
};

export default Register;
