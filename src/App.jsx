import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from 'contexts/AuthContext';

function App() {
  console.log('node env', process.env.NODE_ENV);
  const basename =
    process.env.NODE_ENV === 'development' ? '/' : process.env.PUBLIC_URL;

  return (
    <HashRouter basename={basename}>
      <div className="app">
        <AuthProvider>
          <Routes>
            <Route path="todos" element={<TodoPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </div>
    </HashRouter>
  );
}

export default App;
