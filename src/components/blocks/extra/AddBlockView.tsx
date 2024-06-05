import React, {useCallback, useEffect, useMemo} from "react";
import styled from "styled-components";
import {useAppDispatch} from "../../../redux/store";
import {addBlockTextImage, addBlockMultipleImages} from "../../../redux/ArticleSlice";
import { IoCloseOutline } from "react-icons/io5";


const StyledAddBlockView = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #282c3490;
    z-index: 1000;
    .select-new-block-widget {
        background-color: white;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: var(--border-radius);
        min-height: 20rem;
        max-height: 80vh;
        width: min(40rem, 90vw);
        header {
            position: relative;
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 3rem;
            background-color: #282c34;
            h3 {
                text-transform: uppercase;
                color: white;
                padding-right: 3rem;
                line-height: 1.5;
                text-align: center;
            }
            button {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                svg {
                    color: whitesmoke;
                }
            }
        }
        section {
            position: relative;
            flex: 1;
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            ul {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
                li {
                    button {
                        font-size: 1.125rem;
                        color: white;
                        height: 10rem;
                        width: 10rem;
                        background-color: gray;
                        border-radius: var(--border-radius);
                        padding: 0.5rem;
                    }
                }
            }
        }
    }
`;

interface AddImagesProps extends React.HTMLProps<HTMLInputElement> {
    buttonList?: string[],
    openViewState: {state: boolean, set: React.Dispatch<boolean>}
}

const AddBlockView = (props: AddImagesProps) => {

    type TBlocksNames = 'Textes + Images' | 'Slider Images';

    const listBlocksType: TBlocksNames[] = ['Textes + Images', 'Slider Images'];
    const dispatch = useAppDispatch()


    useEffect(() => {
        document.body.style.overflow = "hidden";
        if(!props.openViewState.state) {
            document.body.style.overflow = "scroll"
        }
    }, []);

    const closeView = useCallback(() => {
        document.body.style.overflow = "initial";
        props.openViewState.set(false);
    }, [props.openViewState])

    const addBlock = useCallback((blockName: TBlocksNames) => {
        switch (blockName) {
            case 'Textes + Images':
                dispatch(addBlockTextImage());
                closeView()
                break;
            case 'Slider Images':
                dispatch(addBlockMultipleImages());
                closeView()
                break;
            default:
                return
        }
    },[])


    return (
        <StyledAddBlockView>
            <div className={'select-new-block-widget'}>
                <header>
                    <h3>Choissisez un bloc à ajouter</h3>
                    <button
                        onClick={() => closeView()}
                    >
                        <IoCloseOutline size={40}/>
                    </button>
                </header>
                <section>
                <ul>
                        {listBlocksType.map((e, i) =>
                            <li key={i}>
                                <button onClick={() => addBlock(e)}>{e}</button>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
        </StyledAddBlockView>
    )
}

export default React.memo(AddBlockView);