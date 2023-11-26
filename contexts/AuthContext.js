import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({ logado: false });

  const login = (email, senha) => {
    if (email === 'arthur@gmail.com.br' && senha === '123456789!') {
      setUsuario({ email, logado: true });
    }
  };

  const logout = () => {
    setUsuario({ logado: false });
  };

  const contexto = {
    usuario,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contexto}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
