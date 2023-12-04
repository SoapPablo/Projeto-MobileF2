import { useContext, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

const EsqueceuSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { error, sendPasswordReset } = useContext(AuthContext);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRecover = async () => {
    try {
      await sendPasswordReset(email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <KeyboardAvoidingView
        style={styles.background}
        behavior="padding"
        enabled>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>
            Recuperar senha
          </Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          {error && (
            <Text
              style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
              {error}
            </Text>
          )}
          <Button mode="contained" onPress={handleRecover}>
            Confirmar
          </Button>
          <Button onPress={handleLogin}>Voltar</Button>
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
});

export default EsqueceuSenha;
