import {Reorder, useDragControls, useMotionValue} from "framer-motion";
import {useRaisedShadow} from "../../hooks/useRaisedShadow";
import {RiDraggable} from "react-icons/ri";
import Input from "./Input";
import React, {ChangeEvent, useState} from "react";
import {addBlock, onChangeParagraph, onChangeTitle, removeBlock} from "../../redux/ArticleSlice";
import TextArea from "./TextArea";
import AddImages from "./AddImages";
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi";
import colors from "../../styles/colors";
import {useAppDispatch, useAppSelector} from "../../redux/store";

interface BlockProps extends React.HTMLProps<HTMLElement> {
    i: number,
    e: any,
    reOrderView: boolean,
}

const Block = ({i, e, reOrderView}: BlockProps) => {

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
            className={reOrderView ? 'reorder-item' :'paragraph-form-container'}>
            {reOrderView ?
                <div className={"item-reorder-content"}>
                    <h3>test du titre {e.index}</h3>
                    <button >
                        <RiDraggable />
                    </button>
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
    )
}

export default Block