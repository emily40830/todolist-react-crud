import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 54px;
  border-bottom: 2px solid black;
`;
const StyledLabel = styled.label`
  font-size: 14;
  color: '#696974';
  text-align: start;
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
`;

const AuthInput = ({ value, onChange, type, placeholder, label, options }) => {
  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={type || 'text'}
        placeholder={placeholder || ''}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        required={options && options.required}
        autoFocus={options && options.autoFocus}
      />
    </StyledContainer>
  );
};

export default AuthInput;