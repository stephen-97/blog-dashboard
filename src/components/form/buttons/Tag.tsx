import React from "react";
import styled, {IStyledComponent} from "styled-components";
import {RxCross2} from "react-icons/rx";

const StyledTag: IStyledComponent<any> = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--dark-gray);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-s);
    button {
        display: flex;
        align-items: end;
    }
    span {
        display: flex;
        padding: 0;
        vertical-align: center;
        line-height: 0.9;
        justify-content: center;
        align-items: center;
    }
`;

interface TagProps extends React.HTMLProps<HTMLButtonElement> {
    label: string,
    remove: () => void
}

const Tag = ({...props}: TagProps) => {

    return (
        <StyledTag {...props}>
            <span>{props.label}</span>
            <button onClick={props.remove}>
                <RxCross2/>
            </button>
        </StyledTag>
    )
}

export default React.memo(Tag);