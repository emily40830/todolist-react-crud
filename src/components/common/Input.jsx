import styled from 'styled-components';

//<input type="text" name="account" class="form-control mt-4" placeholder="帳號"
    //           style="outline: none;border: none;background-color:#F5F8FA;border-radius:0px; border-bottom: 2px solid black;" value="帳號 value"
    //           required autofocus />

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
  border-bottom: 2px solid black;
  width: 100%;
  height: 54px;
`;

const Input = ({value, onChange, type, placeholder, options})=>{

  return (
    <div style={{position: "relative"}}>
    <label style={{zIndex: 2, position:"absolute", top: 2, left: 10, fontSize: 14, color: '#696974'}}>{placeholder}</label>
    <StyledInput
      type={type || "text"}
      placeholder={placeholder || ""}
      value={value || ""}
      onChange={(e) => onChange && onChange(e.target.value)}
      required={options && options.required}
      autoFocus={options && options.autoFocus}
    /></div>
  );
}

export default Input