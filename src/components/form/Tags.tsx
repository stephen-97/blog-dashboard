import React, {createRef, RefObject, useRef} from "react";
import styled, {IStyledComponent} from "styled-components";

const StyledTags: IStyledComponent<any> = styled.div`
    ul {
      display: flex;
      gap: 1rem;
      button {
        box-sizing: border-box;
        padding: 1rem;
        background-color: var(--dark-gray);
        color: var(--white);
        border-radius: var(--border-radius);
        &:hover {
          box-shadow:inset 0px 0px 0px 0.2rem var(--dark-blue);
          //border: 0.2rem solid var(--dark-gray);
          background-color: var(--white);
          color: var(--dark-gray)
        }
      }
    }
`;

interface StyledPragraphProps extends React.HTMLProps<HTMLTextAreaElement> {
    label: string
}
const TextArea = ({label, ...props}: StyledPragraphProps) => {

    return (
        <StyledTags {...props}>
            <label>{label}</label>
            <ul>
                <li><button>Jeux d'aventure</button></li>
                <li><button>Jeux d'aventure</button></li>
                <li><button>Jeux d'aventure</button></li>
            </ul>
        </StyledTags>
    )
}

export default TextArea;