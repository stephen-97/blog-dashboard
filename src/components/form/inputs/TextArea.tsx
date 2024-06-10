import React from "react";
import styled, {IStyledComponent} from "styled-components";

const StyledTextArea  = styled.div`
    display: flex;
    flex-direction: column;
    textarea {
        width: 100%;
        outline: none;   
        font-family: Arial;
        padding: 1rem;
    }
`;

interface StyledPragraphProps extends React.HTMLProps<HTMLTextAreaElement> {
    label?: string,
    className?: string,
}
const TextArea = ({...props}: StyledPragraphProps) => {

    return (
        <StyledTextArea className={props.className}>
            {props.label && <label>{props.label}</label>}
            <textarea {...props}>

            </textarea>
        </StyledTextArea>
    )
}

export default TextArea;