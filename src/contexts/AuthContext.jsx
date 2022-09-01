import jwt from 'jsonwebtoken';
import { createContext, useContext, useEffect, useState } from 'react';
import { login, register, checkTokenExpired } from '../api/auth';

const defaultAuthContext = {
  isAuthenticating: true,
  isAuthenticated: false,
  authToken: null,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
  checkAuth: null,
};

export const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(defaultAuthContext.isAuthenticating);
  const [authToken, setAuthToken] = useState(null);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (!authToken) {
      setPayload(null);
      return;
    }
    try {
      const tmpPayload = jwt.decode(authToken);

      console.log(tmpPayload);
      if (!tmpPayload) {
        return;
      }
      setPayload(tmpPayload);
    } catch (error) {
      process.env.NODE_ENV === 'development' && console.error(error);
    }
  }, [authToken]);

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
          console.log('context data', data);
          setLoading(true);
          login({
            username: data.username,
            password: data.password,
          })
            .then((res) => {
              console.log('login', res);
              setAuthToken(res.authToken);
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
