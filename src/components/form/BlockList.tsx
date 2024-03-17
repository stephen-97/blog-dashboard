import React, {useState} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import { update} from "../../redux/ArticleSlice";
import {Reorder} from "framer-motion";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import Block from "./Block";
import ToggleSwitch from "../utility/ToggleSwitch";
import DragNDrop from "../../assets/dragNDrop.svg"
import {Swiper, SwiperSlide} from "swiper/react";
import ToggleButton2 from "../utility/ToggleButton2";
import {TToggleButton} from "../../utils/config";
const StyledBlockList = styled.section<{$reOrderView: boolean}>`

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
      color: var(--white);
      font-size: var(--xlarge);
      img, svg {
        height: 50px;
        width: 50px;
        color: white;
      }
    }
    .block-list-reorder {
      display: flex !important;
      flex-direction: row !important;
      padding: 1rem;
      flex-wrap: wrap;
      gap: 2rem;
      .reorder-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 0 0 calc(33.333% - 3rem);
        height: 10rem;
        position: relative;
        background-color: white;
        border-radius: var(--border-radius-large);
        overflow: hidden;
        padding: 1rem;
        margin-left: 1rem;
        cursor: grab;
        
        &:hover {
          box-shadow: 0 0 15rem 0 var(--white);
        }
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

const BlockList = ({label,...rest}: StyledBlockListProps) => {

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const [reOrderView, setReOrderView] = useState(false);

    //const [item, setItems] = useState([1,2,3,4])

    const reOrder = (e: any) => {
        dispatch(update({article: e}))
    }

    const buttonsBlockList: TToggleButton[] = [
        {title: "Défaut", callBack: () => null},
        {title: "Réorganisation", callBack: () => null},
        {title: "Détail", callBack: () => null},
    ]
    return (
        <StyledBlockList $reOrderView={reOrderView}>
            <label>{label}</label>
            <div className={"toggle-button-container"}>
                <span>Mode réorganisation</span>
                <ToggleSwitch
                    selectedColor={getComputedStyle(document.documentElement).getPropertyValue('--dark-gray')}
                    defaultColor={getComputedStyle(document.documentElement).getPropertyValue('--gray')}
                    onClick={() => setReOrderView(prev => !prev)}
                />
            </div>
            <div className={'list-container'}>
                <div className={'reorder-container-title'}>
                    Mode d'affichage :
                    <ToggleButton2 buttons={buttonsBlockList} />
                </div>
                        <Reorder.Group
                            values={paragraphData}
                            onReorder={reOrder}
                            axis={"y"}
                            className={`paragraph-plus-images ${reOrderView ? 'block-list-reorder' : ''}`}
                        >
                            {paragraphData && paragraphData.map((e, i) => (
                                <Block i={i} e={e} reOrderView={reOrderView}  key={e.index}/>
                            ))}
                        </Reorder.Group>
            </div>
        </StyledBlockList>
    )
}

export default BlockList;


/**
 * <Reorder.Group
 *                         values={paragraphData}
 *                         onReorder={reOrder}
 *                         axis={"y"}
 *                         className={`paragraph-plus-images ${reOrderView ? 'block-list-reorder' : ''}`}
 *                     >
 *                         {paragraphData && paragraphData.map((e, i) => (
 *                             <Block i={i} e={e} reOrderView={reOrderView}  key={e.index}/>
 *                         ))}
 *                     </Reorder.Group>
 *
 * {reOrderView && <div className={'reorder-container-title'}>
 *                     <img src={DragNDrop} alt={"drag n drop icon"}/>
 *                 </div>}
 */