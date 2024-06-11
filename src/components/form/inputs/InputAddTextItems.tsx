import React from "react";
import styled from "styled-components";
import {FaPlus} from "react-icons/fa";

const StyledInputAddTextItems = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled.div`
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
    handlePressKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    adding: Function,
    itemTagsState: { state: string, set: React.Dispatch<string> },
    label?: string,
    classNameContainer?: string;
}

const InputAddTextItems = ({handlePressKeyDown, adding, itemTagsState, label, classNameContainer, ...props}: InputAddTextItemsProps) => {


    return (
        <StyledInputAddTextItems className={classNameContainer} {...props}>
            {label && <label>{label}</label>}
            <StyledInput>
                <input
                    type={'text'}
                    placeholder={'Ajouter un genre'}
                    onChange={(e) => itemTagsState.set(e.target.value)}
                    onKeyDown={handlePressKeyDown}
                    value={itemTagsState.state}
                />
                <button onClick={() => adding
                ()}>
                    <FaPlus size={25}/>
                </button>
            </StyledInput>
        </StyledInputAddTextItems>
    )
}

export default React.memo(InputAddTextItems);