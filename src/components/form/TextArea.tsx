import React, {createRef, RefObject, useRef} from "react";
import styled, {IStyledComponent} from "styled-components";
import StyledFormInputStyle from "../../styles/FormInputStyle";

const StyledTextArea: IStyledComponent<any> = styled.textarea`
    width: 100%;
    height: 15rem;
    outline: none;
`;

interface StyledPragraphProps extends React.HTMLProps<HTMLTextAreaElement> {
    title: string
}
const TextArea = ({title, ...props}: StyledPragraphProps) => {

    return (
        <StyledFormInputStyle>
            <StyledTextArea {...props}>

            </StyledTextArea>
        </StyledFormInputStyle>
    )
}

export default TextArea;