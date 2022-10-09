import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from 'contexts/AuthContext';

function App() {
  console.log('node env', process.env.NODE_ENV);
  const basename =
    process.env.NODE_ENV === 'development' ? '/' : process.env.PUBLIC_URL;

  return (
    <div className="app">
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <Routes>
            <Route path="todos" element={<TodoPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
