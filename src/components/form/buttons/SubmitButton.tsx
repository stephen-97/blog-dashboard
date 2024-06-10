import React from "react";
import styled, {IStyledComponent} from "styled-components";
import StyledFormInputStyle from "../../../styles/FormInputStyle";

const StyledSubmitButton: IStyledComponent<any> = styled.button`
    font-size: var(--xxlarge);
    background-color: #38404e;
    color: var(--white);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
`;

interface StyledInputProps extends React.HTMLProps<HTMLButtonElement> {
    title: string
}
const SubmitButton = ({title,...rest}: StyledInputProps) => {

    return (
        <StyledSubmitButton {...rest}>
            {title}
        </StyledSubmitButton>
    )
}

export default React.memo(SubmitButton);