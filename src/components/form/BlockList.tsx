import React, {useState} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {update} from "../../redux/ArticleSlice";
import {Reorder} from "framer-motion";
import ToggleButton from "../utility/ToggleButton";
import {TToggleButton} from "../../utils/config";
import BlockReorder from "./BlockReorder";
import BlockDefault from "./BlockDefault";
import BlockListInfo from "./BlockListInfo";
import ImagesBlock from "./ImagesBlock";
import AddBlockView from "./AddBlockView";

const StyledBlockList = styled.section<{ $reOrderView: boolean }>`

    .paragraph-plus-images {
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
    }

    .add-block-item {
        position: relative;
        border: 2px dashed white;
        border-radius: var(--border-radius);
        overflow: hidden;

        .add-block-button {
            padding: 1rem;
            background-color: white;

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
    }

    .toggle-button-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 1rem;
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }

    .list-container {
        background-color: #282c34;
        border-radius: var(--border-radius);
        padding: 1.5rem;

        .reorder-container-title {
            padding: 1rem 0;
            margin-bottom: 1rem;

            label {
                color: var(--white);
                font-size: var(--xlarge);
            }

            img, svg {
                height: 50px;
                width: 50px;
                color: white;
            }
        }

        .block-list-reorder {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap;
            gap: 2rem;

            .reorder-item {
                flex: 0 0 calc(33.333% - 3rem);
            }
        }
    }

    > label {
        display: flex;
        gap: 0.4rem;

        button {
            transition: 0.2s ease-in-out;

            &:hover {
                transform: scale(1.2);
            }
        }
    }
`;

interface StyledBlockListProps extends React.HTMLProps<HTMLElement> {
    label: string
}

const BlockList = ({label, ...props}: StyledBlockListProps) => {

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const [reOrderView, setReOrderView] = useState(false);
    const [openAddBlockView, setOpenAddBlockView] = useState<boolean>(false)

    type TBlockListView = 'default' | 'reorder' | 'info';

    const [blockListView, setBlockListView] = useState<TBlockListView>('default');


    const buttonsBlockList: TToggleButton[] = [
        {title: "Défaut", callBack: () => setBlockListView('default')},
        {title: "Réorganisation", callBack: () => setBlockListView('reorder')},
        {title: "Détail", callBack: () => setBlockListView('info')},
    ]

    return (
        <StyledBlockList $reOrderView={reOrderView} {...props}>
            <label>{label}</label>
            <div className={'list-container'}>
                <div className={'reorder-container-title'}>
                    <label>Mode d'affichage :</label>
                    <ToggleButton buttons={buttonsBlockList}/>
                </div>

                {
                    {
                        'default': <>
                            <ul className={"paragraph-plus-images"}>
                                {paragraphData && paragraphData.map((e, i) => (
                                    <BlockDefault i={i} e={e}/>
                                ))}
                                <li className={'add-block-item'}>
                                    <button
                                        className={'add-block-button'}
                                        onClick={() => setOpenAddBlockView(true)}
                                    >
                                        Ajouter un block
                                    </button>
                                </li>
                            </ul>
                        </>,
                        'reorder': <Reorder.Group
                            values={paragraphData}
                            onReorder={e => dispatch(update({article: e}))}
                            axis={"y"}
                            className={`block-list-reorder`}
                        >
                            {paragraphData && paragraphData.map((e, i) => (
                                <BlockReorder i={i} e={e} key={i}/>
                            ))}
                        </Reorder.Group>,
                        'info': <BlockListInfo/>
                    }[blockListView]
                }
            </div>
            {openAddBlockView && <AddBlockView openViewState={{ state: openAddBlockView, set: setOpenAddBlockView}}/>}
        </StyledBlockList>
    )
}

export default BlockList;