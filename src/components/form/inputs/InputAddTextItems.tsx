import React from "react";
import styled, {IStyledComponent} from "styled-components";
import {FaPlus} from "react-icons/fa";

const StyledInputAddTextItems: IStyledComponent<any> = styled.div`
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
    max-width: var(--max-width-input);

    input {
        height: 4rem;
        width: 100%;
    }

    button {
        position: absolute;
        height: 3rem;
        width: 3rem;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--dark-gray);
        border-radius: var(--border-radius-s);

        svg {
            fill: var(--white);
        }
    }
`;

interface InputAddTextItemsProps extends React.HTMLProps<HTMLDivElement> {
    handlePress: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    addButton: Function,
    itemTagsState: { state: string, set: React.Dispatch<string> },
    label?: string,
}

const InputAddTextItems = ({...props}: InputAddTextItemsProps) => {


    return (
        <StyledInputAddTextItems {...props}>
            <input
                type={'text'}
                placeholder={'Ajouter un genre'}
                onChange={(e) => props.itemTagsState.set(e.target.value)}
                onKeyDown={props.handlePress}
                value={props.itemTagsState.state}
            />
            <button onClick={() => props.addButton()}>
                <FaPlus size={25}/>
            </button>
        </StyledInputAddTextItems>
    )
}

export default React.memo(InputAddTextItems);