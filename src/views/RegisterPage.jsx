import { useState } from 'react';
import styled from 'styled-components';
import { Navigate, Link } from 'react-router-dom';
import { ACLogoIcon } from 'images';
import Input from 'components/common/AuthInput';

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

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { register, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  const handleSubmit = () => {
    console.log({ email, username: userName, password });
    register({ email, username: userName, password });
  };

  return (
    <Container>
      <div className="mt-5">
        <ACLogoIcon />
      </div>
      <h1 className="h3 mb-3 font-weight-normal">建立您的帳號</h1>
      <InputContainer>
        <Input
          title={'username'}
          label={'帳號'}
          value={userName}
          placeholder={'請輸入帳號'}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          label={'Email'}
          title={'email'}
          value={email}
          placeholder={'請輸入email'}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </InputContainer>
      <InputContainer>
        <Input
          type={'password'}
          label={'密碼'}
          value={password}
          placeholder={'請輸入密碼'}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </InputContainer>
      <Button onClick={handleSubmit}>註冊</Button>
      <Link to="/login">
        <StyledLinkText>取消</StyledLinkText>
      </Link>
    </Container>
  );
};

export default RegisterPage;

//const RegisterPage = ()=>{

//  return (
//    <div>RegisterPage</div>
//     <div class="container mt-5">
//   <div class="row justify-content-center" style="">
//     <form class="form-signin m-auto" action="/signup" method="POST" style="width: 50%;">
//       <div class="icon icon-ac-mark text-center" style="color:#FF6600;font-size: 50px;"></div>
//       <div class="text-center mb-4">
//         <h1 class="h3 mb-3 font-weight-normal">建立您的帳號</h1>
//       </div>

//       <div class="form-label-group">
//         <input type="text" name="account" class="form-control mt-4" placeholder="帳號"
//           style="outline: none;border: none;background-color:#F5F8FA;border-radius:0px; border-bottom: 2px solid black;" value="{{userInput.account}}"
//           required autofocus maxlength="30" />
//       </div>
//       <div class="form-label-group">
//         <input type="text" name="name" class="form-control mt-4" placeholder="名稱"
//           style="outline: none;border: none;background-color:#F5F8FA;border-radius:0px; border-bottom: 2px solid black;" value="{{userInput.name}}"
//           required maxlength="30" />
//       </div>
//       <div class="form-label-group">
//         <input type="email" name="email" class="form-control mt-4" placeholder="Email"
//           style="outline: none;border: none;background-color:#F5F8FA;border-radius:0px; border-bottom: 2px solid black;" value="{{userInput.email}}"
//           required maxlength="30" />
//       </div>
//       <div class="form-label-group">
//         <input type="password" name="password" class="form-control mt-4" placeholder="密碼"
//           style="outline: none;border: none;background-color:#F5F8FA;border-radius:0px; border-bottom: 2px solid black;"
//           required maxlength="30" />
//       </div>
//       <div class="form-label-group">
//         <input type="password" name="checkPassword" class="form-control mt-4" placeholder="密碼確認"
//           style="outline: none;border: none;background-color:#F5F8FA;border-radius:0px; border-bottom: 2px solid black;"
//           required maxlength="30" />
//       </div>
//       <br />
//       <button class="btn btn-lg btn-primary btn-block mt-4" type="submit"
//         style="border-radius: 30px;background-color:#FF6600;border-color: #fff;">註冊</button>
//       <a class="btn btn-lg btn-primary btn-block mt-2" href="javascript:history.back()"
//         style="border-radius: 30px;background-color:#fff;border-color: #FF6600;color:#FF6600;">取消</a>

//     </form>
//   </div>
// </div>
//  )
//}
