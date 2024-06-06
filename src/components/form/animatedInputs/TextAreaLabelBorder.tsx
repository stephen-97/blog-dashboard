import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    width: 100%;
    padding: 16px;
    outline: none;
    height: 15rem;
    border: 0.15rem solid ${props => props.theme.mainColor};

    &:valid ~ label,
    &:focus ~ label {
        transform: translateY(-50%);
        left: 0.5rem;
        font-size: 1.125rem;
        background-color: var(--light-gray-2);
        padding: 0.5rem;
        color: var(--dark-blue)
    }
`;

const StyledTextAreaLabelBorder = styled.div`
    position: relative;

    label {
        position: absolute;
        padding: 1rem;
        left: 0;
        pointer-events: none;
        text-transform: uppercase;
        transition: All 0.15s ease-in-out;
        color: gray;
    }

`;

interface TextAreaLabelBorderProps extends React.HTMLProps<HTMLTextAreaElement> {
    label?: string,
    className?: string,
}

const TextAreaLabelBorder = ({label, className, ...rest}: TextAreaLabelBorderProps) => {

    return (
        <StyledTextAreaLabelBorder className={className}>
            <StyledTextArea {...rest} required={true}/>
            {label &&
                    <label>{label}</label>
            }
        </StyledTextAreaLabelBorder>
    )
}

export default React.memo(TextAreaLabelBorder);