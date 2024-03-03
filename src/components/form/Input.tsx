import React from "react";
import styled, {IStyledComponent} from "styled-components";
import StyledFormInputStyle from "../../styles/FormInputStyle";

const StyledInput: IStyledComponent<any> = styled.input`
    width: 100%;
    height: 4rem;
    border: 0.15rem solid ${props => props.theme.mainColor};
`;

interface StyledInputProps extends React.HTMLProps<HTMLInputElement> {
    label: string
}
const Input = ({label,...rest}: StyledInputProps) => {

    return (
        <StyledFormInputStyle>
            <label>{label}</label>
            <StyledInput {...rest}>

            </StyledInput>
        </StyledFormInputStyle>
    )
}

export default Input;