import { useState } from 'react';
import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { Navigate } from 'react-router-dom';
import { ACLogoIcon } from 'assets/images';
import AuthInput from 'components/AuthInput';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { register, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  const handleSubmit = () => {
    console.log('handleSubmit');
    register({ email, username: userName, password });
  };

  return (
    <AuthContainer>
      <div className="mt-5">
        <ACLogoIcon />
      </div>
      <h1 className="h3 mb-3 font-weight-normal">建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          title="username"
          label="帳號"
          value={userName}
          placeholder="請輸入帳號"
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="Email"
          title="email"
          value={email}
          placeholder="請輸入email"
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleSubmit}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
