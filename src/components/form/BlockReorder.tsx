import {Reorder, useDragControls, useMotionValue} from "framer-motion";
import {useRaisedShadow} from "../../hooks/useRaisedShadow";
import {RiDraggable} from "react-icons/ri";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import styled from "styled-components";


interface BlockReorderProps extends React.HTMLProps<HTMLElement> {
    i: number,
    e: any,
}


const StyledBlockReorder = styled.div`
    display: flex;
    flex-direction: row;
    transition: none !important;
    align-items: center;
    height: 10rem;
    position: relative;
    background-color: white;
    border-radius: var(--border-radius-large);
    overflow: hidden;
    padding: 1rem;
    margin-left: 1rem;
    cursor: grab;

    .item-reorder-content {
      position: relative;
      display: flex;
      flex-direction: row;
      height: 5rem;
      align-items: center;
      flex: 1;
      h3 {
        margin: 0;
        padding: 0;
        flex: 1;
      }
      button {
        flex: 0.2;
        cursor: grab;
        svg {
          transform: scale(2);
          transform-origin: center;
        }
      }
    }
`

const BlockReorder = ({i, e}: BlockReorderProps) => {

    const dragControls = useDragControls()
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);


    return (
        <Reorder.Item
            value={e}
            dragListener={true}
            drag
            style={{ boxShadow, y }}
            dragControls={dragControls}
            className={' reorder-item'}>
                <StyledBlockReorder>
                    <h3>test du titre {e.index}</h3>
                    <button >
                        <RiDraggable />
                    </button>
                </StyledBlockReorder>
        </Reorder.Item>
    )
}

export default BlockReorder