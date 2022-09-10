import jwt from 'jsonwebtoken';
import { createContext, useContext, useEffect, useState } from 'react';
import { login, register, checkTokenExpired } from '../api/auth';
const defaultAuthContext = {
  isAuthenticated: false,
  authToken: null,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext(defaultAuthContext);
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setPayload(null);
      setAuthToken(null);
      return;
    }
    try {
      const tmpPayload = jwt.decode(token);
      if (!tmpPayload) {
        return;
      }
      setAuthToken(token);
      setPayload(tmpPayload);
    } catch (error) {
      console.error(error);
    }
  }, [localStorage.getItem('authToken')]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(authToken),
        authToken,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: (data) => {
          register({
            email: data.email,
            username: data.username,
            password: data.password,
          })
            .then(({ authToken }) => {
              localStorage.setItem('authToken', authToken);
              setAuthToken(authToken);
            })
            .catch((error) => {
              setAuthToken(null);
              console.error(error);
            });
        },
        login: (data) => {
          login({
            username: data.username,
            password: data.password,
          })
            .then((res) => {
              localStorage.setItem('authToken', res.authToken);
            })
            .catch((error) => {
              setAuthToken(null);
              console.error(error);
            });
        },
        logout: () => {
          localStorage.clear();
          setAuthToken(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
