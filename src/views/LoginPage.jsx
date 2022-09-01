import { useState } from 'react';
import styled from 'styled-components';
import { Navigate, Link } from 'react-router-dom';
import { ACLogoIcon } from 'images';
import Input from 'components/common/Input';

import { useAuth } from 'contexts/AuthContext';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  width: 50%;
  margin-top: 30px;
`;

const Button = styled.button`
  border-radius: 30px;
  background-color: #ff6600;
  border: none;

  color: white;
  min-width: 300px;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
  padding: 6px 0;
  margin: 2rem 0;

  &.hover {
    cursor: pointer;
  }
`;

const StyledLinkText = styled.div`
  color: #0062ff;
  font-size: 16px;
  font-weight: 400;
`;

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  const handleSubmit = () => {
    login({ username: userName, password });
  };

  return (
    <Container>
      <div className="mt-5">
        <ACLogoIcon />
      </div>
      <h1 className="h3 mb-3 font-weight-normal">登入 Todo</h1>
      <InputContainer>
        <Input
          title={'username'}
          value={userName}
          placeholder={'帳號'}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type={'password'}
          value={password}
          placeholder={'密碼'}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </InputContainer>
      <Button onClick={handleSubmit}>登入</Button>
      <Link to="/register">
        <StyledLinkText>註冊</StyledLinkText>
      </Link>
    </Container>
  );
};

export default Login;
