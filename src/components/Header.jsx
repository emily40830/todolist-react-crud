import styled from 'styled-components';
import { useAuth } from 'contexts/AuthContext';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledGreetingText = styled.span`
  color: var(--gray);

  span {
    color: var(--major);
  }
`;

const Header = () => {
  const { currentMember } = useAuth();
  return (
    <StyledHeader>
      <h3>Tasks</h3>
      <StyledGreetingText>
        Hi <span>{currentMember.name}</span>
      </StyledGreetingText>
    </StyledHeader>
  );
};

export default Header;
