import { HomePage, LoginPage, SignUpPage, TodoPage } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
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
  );
}

export default App;
