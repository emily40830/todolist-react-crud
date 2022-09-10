import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from 'contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="todos" element={<TodoPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignUpPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
