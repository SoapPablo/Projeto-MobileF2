import React from 'react';
import { useContext, useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';

const Login = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleRecoverPassword = () => {
    navigation.navigate('RecoverPassword');
  };

const [showPassword, setShowPassword] = useState(false);


  const onSubmit = (data) => {
    try {
      login(data.email, data.senha);
      navigation.navigate('BuscarEventos');
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
    }
  };

  const [offset] = React.useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = React.useState(new Animated.Value(0));
  const [logo] = React.useState(new Animated.ValueXY({ x: 110, y: 110 }));

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, { toValue: 0, speed: 4, bounciness: 20 }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <KeyboardAvoidingView
        style={styles.background}
        behavior="padding"
        enabled>
        <ScrollView style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.containerLogo}>
            <Animated.Image
              style={{
                width: logo.x,
                height: logo.y,
              }}
              source={require('../assets/LogoEuVou.png')}
            />
          </View>
          <Animated.View
            style={[
              styles.container,
              { opacity: opacity, transform: [{ translateY: offset.y }] },
            ]}>
            <Text
              style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>
              Login
            </Text>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Email obrigatório' },
                pattern: {
                  value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
                  message: 'Email no formato invalido',
                },
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
              )}
              name="email"
            />
            <HelperText type="error" visible={errors.email}>
              {errors.email ? errors.email.message : ''}
            </HelperText>

            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Senha obrigatória' },
                minLength: {
                  value: 6,
                  message: 'Senha deve conter no mínimo 6 caracteres',
                },
                validate: (senha) => {
                  if (senha.includes('!')) return true;
                  return 'Sem caracter especial';
                },
              }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  style={styles.input}
                  label="Senha"
                  secureTextEntry={true}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="senha"
            />
            <HelperText type="error" visible={errors.senha}>
              {errors.senha ? errors.senha.message : ''}
            </HelperText>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.buttonEntrar}>
              Entrar
            </Button>
            <Button onPress={handleRegister}>Não tenho conta</Button>
            <Button onPress={handleRecoverPassword}>Recuperar senha</Button>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 17,
    backgroundColor: '#FFF',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonEntrar: {
    marginTop: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A020F0',
    borderRadius: 5,
    shadowOffset: { width: -5, height: 5 },
    shadowRadius: 5,
  },
  input: {
    borderRadius: 5,
  },
});

export default Login;
