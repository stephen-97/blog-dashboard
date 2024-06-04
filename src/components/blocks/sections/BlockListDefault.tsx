import React, {useState} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import TextImagesBlock from "./TextImagesBlock";
import AddBlockView from "./AddBlockView";

const StyledBlockListDefaultContainer = styled.ul`

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35rem, 0.5fr));
    grid-gap: 2rem;

    .paragraph-form-container {
        background-color: var(--white);
        padding: 1rem;
        display: grid;
        height: 38rem;
        border-radius: var(--border-radius);
        grid-template-columns: repeat(9, 1fr);
        grid-template-rows: repeat(12, 1fr);
        gap: 1rem;


        &:hover {
            .button-plus-container,
            .button-minus-container,
            .paragraph-number-container {
                visibility: visible;
            }
        }

        > * {
            &:nth-child(1) {
                grid-area: 1 / 1 / 3 / 9;
            }

            &:nth-child(2) {
                grid-area: 3 / 1 / 10 / 9;
            }

            &:nth-child(3) {
                grid-area: 10 / 1 / 13 / 9;
            }

            &:nth-child(4) {
                grid-area: 1 / 9 / 5 / 10;
            }

            &:nth-child(5) {
                grid-area: 5 / 9 / 9 / 10;
            }

            &:nth-child(6) {
                grid-area: 9 / 9 / 13 / 10;
            }
        }

        .paragraph-form-button {
            display: flex;
            justify-content: center;
            align-items: center;
                //border: 2px solid ${props => props.theme.mainColor};
            border-radius: var(--border-radius);
            //background-color: var(--light-gray);

            svg {
                height: 3rem;
                width: 3rem;
                color: ${props => props.theme.mainColor};
            }
        }

        .button-plus-container {
            svg {
                color: var(--blue);
            }
        }

        .button-minus-container {
            svg {
                color: var(--red);
            }
        }

        .icon-not-clickable {
            svg {
                color: var(--gray);
            }
        }

        .paragraph-number-container {
            border: none;
            font-size: 2.5rem;
            cursor: inherit;
            background-color: inherit;

            &:hover {
                background-color: inherit;
            }
        }
    }
`;

interface BlockListContainerProps extends React.HTMLProps<HTMLElement> {}

const BlocksListDefaultContainer = ({label, ...props}: BlockListContainerProps) => {

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const [openAddBlockView, setOpenAddBlockView] = useState<boolean>(false)


    return (
        <>
            <StyledBlockListDefaultContainer>
                {paragraphData && paragraphData.map((e, i) => (
                    <TextImagesBlock i={i} e={e}/>
                ))}
                <li className={'add-block-item'}>
                    <button
                        className={'add-block-button'}
                        onClick={() => setOpenAddBlockView(true)}
                    >
                        Ajouter un block
                    </button>
                </li>
            </StyledBlockListDefaultContainer>
            {openAddBlockView && <AddBlockView openViewState={{ state: openAddBlockView, set: setOpenAddBlockView}}/>}
        </>
    )
}

export default React.memo(BlocksListDefaultContainer);