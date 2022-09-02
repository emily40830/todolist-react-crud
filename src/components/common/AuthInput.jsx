import styled from 'styled-components';

//<input type="text" name="account" class="form-control mt-4" placeholder="帳號"
//           style="outline: none;border: none;background-color:#F5F8FA;border-radius:0px; border-bottom: 2px solid black;" value="帳號 value"
//           required autofocus />
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
  font-size: 14,
  color: '#696974'
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
        onChange={(e) => onChange && onChange(e.target.value)}
        required={options && options.required}
        autoFocus={options && options.autoFocus}
      />
    </StyledContainer>
  );
};

export default AuthInput;
