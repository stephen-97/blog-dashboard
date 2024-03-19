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
`

const BlockReorder = ({i, e}: BlockReorderProps) => {

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const AddBlockIsOk = (index: number): boolean => {
        return true;
        /**
         * if(paragraphData[index].paragraph !== '')
         *             return true
         *         for(let i =0; i < paragraphData[index].images.length; i++) {
         *             if(paragraphData[index].images[i] !== '')
         *                 return true
         *         }
         *         return false;
         */
    }

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
            className={'reOrderView paragraph-form-container'}>
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