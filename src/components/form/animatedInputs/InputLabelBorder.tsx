import React from "react";
import styled, {IStyledComponent} from "styled-components";
import StyledFormInputStyle from "../../../styles/FormInputStyle";

const StyledInput = styled.input`
    width: 100%;
    padding: 16px;
    outline: none;
    height: 4rem;
    border: 0.15rem solid ${props => props.theme.mainColor};

    &:valid ~ label,
    &:focus ~ label
    {
        transform: translateY(-50%);
        padding: 0.5rem;
        left: 0.5rem;
        font-size: 1.125rem;
        background-color: var(--light-gray-2);
        color: var(--dark-blue)
    }
`;

const StyledInputLabelBorder = styled.div`
    position: relative;
    label {
        position: absolute;
        padding: 1rem;
        left: 0;
        pointer-events: none;
        text-transform: uppercase;
        transition: 0.25s ease-in-out;
        color: gray;
    }
    
`;

interface InputLabelBorderProps extends React.HTMLProps<HTMLInputElement> {
    label?: string
}

const InputLabelBorder = ({label, ...rest}: InputLabelBorderProps) => {

    return (
        <StyledInputLabelBorder>
            <StyledInput {...rest} type={"text"} required={true}>
            </StyledInput>
            {label && <label>{label}</label>}
        </StyledInputLabelBorder>
    )
}

export default React.memo(InputLabelBorder);