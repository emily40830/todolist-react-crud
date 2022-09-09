import jwt from 'jsonwebtoken';
import { createContext, useContext, useEffect, useState } from 'react';
import { login, register, checkTokenExpired } from '../api/auth';
const defaultAuthContext = {
  isAuthenticating: false,
  isAuthenticated: false,
  authToken: null,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
  checkAuth: null,
};

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext(defaultAuthContext);
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(defaultAuthContext.isAuthenticating);
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
      const tmpPayload = jwt.decode(authToken);
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
        isAuthenticating: loading,
        isAuthenticated: Boolean(authToken),
        authToken,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          setLoading(true);
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
            })
            .finally(() => {
              setLoading(false);
            });
        },
        login: async (data) => {
          setLoading(true);
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
            })
            .finally(() => {
              setLoading(false);
            });
        },
        logout: async () => {
          localStorage.clear();
          setAuthToken(null);
        },
        checkAuth: async () => {
          checkTokenExpired(authToken)
            .then((res) => {
              console.log('checkTokenExpired', res);
            })
            .catch((error) => console.error(error));
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
