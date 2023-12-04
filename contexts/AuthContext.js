import { createContext, useState } from 'react';
import { signIn, signUp, sendPasswordResetEmail } from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({ email: null, logado: true });
  const [error, setError] = useState('');

  const login = async (email, senha) => {
    try {
      if (!email || !senha) {
        throw Error('Preencha todos os campos antes de fazer login.');
      }
      const token = await signIn(email, senha);
      setUsuario({ email, logado: true, token });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    setUsuario({ email: null, logado: false, token: null });
  };

  const register = async (nome, email, senha) => {
    try {
      if (!nome || !email || !senha) {
        throw Error('Preencha todos os campos.');
      }
      await signUp(nome, email, senha);
      setUsuario({ email, logado: false });
      setError(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      if (!email) {
        throw Error('Preencha o campo Email');
      }
      await sendPasswordResetEmail(email);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ error, usuario, login, logout, register, sendPasswordReset }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
