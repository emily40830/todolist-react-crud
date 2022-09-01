import { LoginPage, TodoPage, RegisterPage, HomePage } from 'views';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="todos" element={<TodoPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
