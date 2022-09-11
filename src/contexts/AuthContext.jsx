import jwt from 'jsonwebtoken';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { checkPermission, login, register } from '../api/auth';
const defaultAuthContext = {
  isAuthenticated: false,
  authToken: null,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
  checkPermission: null,
};

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext(defaultAuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ?? null;
  });
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!authToken) {
      setPayload(null);
      setIsAuthenticated(false);
    }
    const tmpPayload = jwt.decode(authToken);
    if (tmpPayload) {
      setPayload(tmpPayload);
      setIsAuthenticated(true);
    } else {
      setPayload(null);
      setIsAuthenticated(false);
    }
  }, [authToken]);

  useEffect(() => {
    const currentToken = localStorage.getItem('authToken');
    console.log('pathname', pathname);
    checkPermission(currentToken);
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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
              setAuthToken(res.authToken);
            })
            .catch((error) => {
              console.error(error);
            });
        },
        logout: () => {
          localStorage.clear();
          setAuthToken(null);
        },
        checkPermission: () => {
          const currentToken = localStorage.getItem('authToken');
          checkPermission(currentToken)
            .then((isSuccess) => {
              setIsAuthenticated(isSuccess);
            })
            .catch((error) => {
              console.error(error);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
