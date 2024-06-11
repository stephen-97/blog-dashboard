import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.div`
    display: flex;
    flex-direction: column;

    textarea {
        width: 100%;
        outline: none;
        font-family: Arial;
        padding: 1rem;
    }
`;

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    label?: string,
    classNameContainer?: string,
}

const TextArea = ({classNameContainer, label, ...props}: TextAreaProps) => {

    return (
        <StyledTextArea className={classNameContainer}>
            {label && <label>{label}</label>}
            <textarea {...props}/>
        </StyledTextArea>
    )
}

export default React.memo(TextArea);