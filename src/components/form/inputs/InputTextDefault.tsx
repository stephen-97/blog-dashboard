import React from "react";
import styled from "styled-components";
import StyledFormInputStyle from "../../../styles/FormInputStyle";

const StyledInputTextDefault  = styled.input`
    width: 100%;
    height: 4rem;
    border: 0.15rem solid ${props => props.theme.mainColor};
`;

interface StyledInputTextDefaultProps extends React.HTMLProps<HTMLInputElement> {
    label?: string
}

const InputTextDefault = ({label, ...rest}: StyledInputTextDefaultProps) => {

    return (
        <StyledFormInputStyle>
            {label && <label>{label}</label>}
            <StyledInputTextDefault {...rest} />
        </StyledFormInputStyle>
    )
}

export default InputTextDefault;