import React, {ChangeEvent} from "react";
import styled, {IStyledComponent} from "styled-components";
import Input from "../form/Input";
import Tags from "../form/Tags";
import BlockList from "../form/BlockList";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {onChangeArticleTitle} from "../../redux/ArticleTitleSlice";
import MainImage from "../form/MainImage";
import SubmitButton from "../form/SubmitButton";
import ArticleGameTags from "../form/ArticleGameTags";
import ArticleThemes from "../form/ArticleThemes";

const StyledArticleForm: IStyledComponent<any> = styled.section`
  min-width: 100%;
  flex: 1;
  
  .input-title {
    width: 50%;
    font-weight: bolder;
  }
  .form-item {
    margin-bottom: 2rem;
  }
`;

interface StyledArticleForm extends React.HTMLProps<HTMLElement> {

}
const ArticleForm = ({...rest}: StyledArticleForm) => {

    const dispatch = useAppDispatch()
    const title = useAppSelector((state) => state.articleTitle)

    //data: string[],
    //     add: any,
    //     remove: any

    /**
     * <Tags
     *                 label={'Types de jeux'}
     *                 className={'form-item'}
     *             />
     */
    //                            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(onChangeTitle({title: e.target.value, index: i}))}
    return (
        <StyledArticleForm>
            <Input
                label={"Titre de l'article"}
                placeholder={"Titre de l'article"}
                className={'input-title form-item'}
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(onChangeArticleTitle({title: e.target.value}))}
            />
            <ArticleGameTags
                label={'Types de jeux'}
                className={'form-item'}
            />
            <ArticleThemes
                label={'Thèmes abordés'}
                className={'form-item'}
            />

            <MainImage
                label={"Image principale et secondaire"}
                className={'form-item'}
            />
            <BlockList
                label={"Liste des paragraphes"}
                className={'form-item'}
            />
            <SubmitButton
                value={'Soumettre'}
                type={'submit'}
                title={'Soumettre '}
            />
        </StyledArticleForm>
    )
}

export default React.memo(ArticleForm);
