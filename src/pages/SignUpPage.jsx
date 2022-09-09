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
      <h1 className="h3 mb-3 font-weight-normal">建立您的帳號</h1>

      {'帳號'}
      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>
      {'email'}
      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>

      {'密碼'}
      <AuthInputContainer>
        <AuthInput />
      </AuthInputContainer>
      <AuthButton>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
