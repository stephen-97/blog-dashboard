import InputTextDefault from "../../form/inputs/InputTextDefault";
import React, {ChangeEvent} from "react";
import {onChangeTextImage, removeBlock} from "../../../redux/ArticleSlice";
import TextArea from "../../form/inputs/TextArea";
import AddImages from "../extra/AddImages";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import styled from "styled-components";
import {TArticleTextImage} from "../../../utils/config";
import BlockTitle from "../extra/BlockTitle";


const StyledTextImagesBlock = styled.li`
    
    .paragraph {
        display: flex;
        flex-direction: column;
        flex: 1;
        textarea {
            flex: 1;
        }
    }

`;

interface TextImagesBlockProps extends React.HTMLProps<HTMLLIElement> {
    i: number,
    e: any,
}

const TextImagesBlock = ({i, e, ...rest}: TextImagesBlockProps) => {

    const blockList = useAppSelector((state) => state.article)
    const currentTextImage = blockList[i] as TArticleTextImage;
    const dispatch = useAppDispatch()

    const onChange = (param: 'title' | 'paragraph', value: any) => {
        let currentTextImageClone = {...currentTextImage};
        currentTextImageClone[param] = value;
        dispatch(onChangeTextImage({textImage: currentTextImageClone, index: i}));
    }


    return (
        <StyledTextImagesBlock {...rest}>
            <BlockTitle
                title={'Texte + Images'}
                index={i+1}
                setDeleteBlock={() =>  dispatch(removeBlock({index: i}))}
            />
            <InputTextDefault
                placeholder={"Titre du block"}
                value={e['title']}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('title', e.target.value)}
            />
            <TextArea
                className={'paragraph'}
                placeholder={'Paragraphe'}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange('paragraph', e.target.value)}
                value={e['paragraph']}
            />
            <AddImages paragraphIndex={i}/>
        </StyledTextImagesBlock>
    )
}

export default React.memo(TextImagesBlock);


