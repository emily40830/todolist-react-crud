import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import AuthInput from 'components/AuthInput';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <AuthContainer>
      <div className="mt-5">
        <ACLogoIcon />
      </div>
      <h1 className="h3 mb-3 font-weight-normal">登入 Todo</h1>

      {'帳號'}
      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>

      {'密碼'}
      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>
      <AuthButton>登入</AuthButton>
      <Link to="/register">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
