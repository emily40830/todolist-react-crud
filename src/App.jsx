import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from 'contexts/AuthContext';

function App() {
  return (
    <div className="app">
      <HashRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <Routes>
            <Route path="todos" element={<TodoPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
