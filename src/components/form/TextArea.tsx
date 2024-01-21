import React, {createRef, RefObject, useRef} from "react";
import styled, {IStyledComponent} from "styled-components";
import StyledFormInputStyle from "../../styles/FormInputStyle";

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