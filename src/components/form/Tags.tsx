import React, {createRef, RefObject, useRef} from "react";
import styled, {IStyledComponent} from "styled-components";

const StyledTags: IStyledComponent<any> = styled.div`
    width: 100%;
    outline: none;
`;

interface StyledPragraphProps extends React.HTMLProps<HTMLTextAreaElement> {
    title: string
}
const TextArea = ({title, ...props}: StyledPragraphProps) => {

    return (
        <StyledTags {...props}>
            <ul>
                <li>Jeux d'aventure</li>
                <li>RPG</li>
                <li>Jeux d'aventure</li>
            </ul>
        </StyledTags>
    )
}

export default TextArea;