import React, {ChangeEvent, useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import TextArea from "../form/TextArea";
import AddImages from "../form/AddImages";
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {addBlock, onChangeParagraph, onChangeTitle, removeBlock, update} from "../../redux/ArticleSlice";
import colors from "../../styles/colors";
import Input from "./Input";
import {Reorder} from "framer-motion";
import {TAritcleContent} from "../../utils/config";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";

const StyledBlockList = styled.section<{$reOrderView: boolean}>`
 
  
  .paragraph-plus-images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35rem, 0.5fr));
    //flex-wrap: wrap;
    grid-gap: 2rem;

    > * {
      flex: 0 0 calc(50% - 2rem);
    }

    .paragraph-form-container {
      background-color: var(--white);
      padding: 1rem;
      display: grid;
      //margin-bottom: 4rem;
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
        cursor: pointer;

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

  .block-list-reorder {
    display: flex !important;
    flex-direction: column !important;
    background-color: red;
    .paragraph-form-container{
      width: 40rem !important;
      height: 10rem !important;
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

    const [redOrderView, setReOrderView] = useState(false);

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

    /**
     * const [items, setItems] = useState<TAritcleContent[]>(
     *         [
     *             {
     *                 index: 1,
     *                 title: 'a',
     *                 paragraph: "",
     *                 images: ['', '', ''],
     *             },
     *
     *             {
     *                 index: 2,
     *                 title: 'b',
     *                 paragraph: "",
     *                 images: ['', '', '']
     *             },
     *             {
     *                 index: 3,
     *                 title: 'b',
     *                 paragraph: "",
     *                 images: ['', '', '']
     *             }
     *             ,
     *             {
     *                 index: 4,
     *                 title: 'b',
     *                 paragraph: "",
     *                 images: ['', '', '']
     *             }
     *     ])
     */

    //const [item, setItems] = useState(1,2,3,4)
    return (
        <StyledBlockList $reOrderView={redOrderView}>
            <label>{label}
                <button onClick={() => setReOrderView(prev => !prev)}>
                    <RiCheckboxMultipleBlankFill />
                </button>
            </label>
            <Reorder.Group
                values={paragraphData}
                onReorder={(e) => dispatch(update({article: e}))}
                className={`paragraph-plus-images ${redOrderView ? 'block-list-reorder' : ''}`}
                axis={"y"}
            >
                {paragraphData && paragraphData.map((e, i) => (
                    <Reorder.Item
                        value={e}
                        key={e.index}
                        dragListener={redOrderView}
                        className={'paragraph-form-container'}>
                        {redOrderView ?
                            <div>
                                <h3>{e['title']}</h3>
                            </div>
                            :
                            <>
                                <Input
                                    label={""}
                                    placeholder={"Titre du block"}
                                    value={e['title']}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(onChangeTitle({title: e.target.value, index: i}))}
                                />
                                <TextArea
                                    title={"Paragraphe"}
                                    placeholder={'Paragraphe'}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(onChangeParagraph({text :e.target.value, index: i})) }
                                    value={e['paragraph']}
                                />
                                <AddImages paragraphIndex={i} />
                                <div className={"paragraph-form-button paragraph-number-container"}>
                                    <strong>{i + 1}</strong>
                                </div>
                                <div className={"paragraph-form-button button-plus-container"}>
                                    <button onClick={() => AddBlockIsOk(i) ? dispatch(addBlock()) : alert("Il faut ajouter du contenu avant de créer un nouveau block")}>
                                        <BiPlusCircle className={'icon'} color={colors.blue}/>
                                    </button>
                                </div>
                                <div className={ i === 0 && paragraphData.length === 1 ?
                                    "icon-not-clickable paragraph-form-button button-minus-container" :
                                    "paragraph-form-button button-minus-container"
                                }>
                                    {i > 0  &&
                                        <button onClick={() => i > 0 && dispatch(removeBlock({index: i})) }>
                                            <BiMinusCircle className={colors.darkBlue} />
                                        </button>
                                    }
                                </div>
                            </>
                        }
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </StyledBlockList>
    )
}

export default BlockList;
