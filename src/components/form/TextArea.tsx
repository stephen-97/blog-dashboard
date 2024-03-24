import React from "react";
import styled, {IStyledComponent} from "styled-components";
const StyledTextArea: IStyledComponent<any> = styled.textarea`
    width: 100%;
    outline: none;
`;

interface StyledPragraphProps extends React.HTMLProps<HTMLTextAreaElement> {
    title: string
}
const TextArea = ({title, ...props}: StyledPragraphProps) => {

    return (
        <StyledTextArea {...props}>

        </StyledTextArea>
    )
}

export default TextArea;