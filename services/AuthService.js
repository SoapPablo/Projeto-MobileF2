import axios from 'axios';

const API_KEY = 'AIzaSyC_NfUP4frRz6boI-jOjVYoeQ9g5cHX5bw';

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

const signIn = async (email, password) => {
  try {
    await axios.post(`${BASE_URL}:signInWithPassword?key=${API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error.message;

      if (
        errorMessage ===
        'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
      ) {
        throw new Error(
          'Usuário bloqueado devido ao excesso de tentativas. Redefina sua senha.'
        );
      } else {
        throw new Error('Email e/ou senha inválidos');
      }
    } else {
      throw new Error('Erro durante o login', error);
    }
  }
};

const signUp = async (nome, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}:signUp?key=${API_KEY}`, {
      email,
      password,
      displayName: nome, 
      returnSecureToken: true,
    });

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.data.error.message === 'EMAIL_EXISTS') {
        throw Error('Usuário já cadastrado');
      }
    } else {
      console.error('Erro durante o cadastro:', error);
    }
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await axios.post(`${BASE_URL}:sendOobCode?key=${API_KEY}`, {
      requestType: 'PASSWORD_RESET',
      email,
    });
    console.log('E-mail de recuperação de senha enviado com sucesso.');
    setError(null);
  } catch (error) {
    throw new Error('Erro ao recuperar senha, Email não encontrado.');
  }
}; 

export { signIn, signUp, sendPasswordResetEmail };
