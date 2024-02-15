import React, {ChangeEvent} from "react";
import styled, {IStyledComponent} from "styled-components";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import AddImages from "../form/AddImages";
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {addingTextToParagraph, addParagraph, removeParagraph} from "../../redux/ArticleSlice";
const StyledArticleForm: IStyledComponent<any> = styled.section`
  min-width: 100%;
  flex: 1;
  .paragraph-form-container {
    display: grid;
    margin-bottom: 4rem;
    height: 30rem;
    border-radius: var(--border-radius);
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 1rem;

    > * {
      &:nth-child(1) {
        grid-area: 1 / 1 / 5 / 6;
      }
      &:nth-child(2) {
        grid-area: 5 / 1 / 7 / 6;
      }
      &:nth-child(3) {
        grid-area: 1 / 6 / 3 / 7;
      }
      &:nth-child(4) {
        grid-area: 3 / 6 / 5 / 7;
      }
      &:nth-child(5) {
        grid-area: 5 / 6 / 7 / 7;
      }
    }

    .paragraph-form-button {
      display: flex;
      justify-content: center;
      align-items: center;
        //border: 2px solid ${props => props.theme.mainColor};
      border-radius: var(--border-radius);
      background-color: var(--light-gray);
      cursor: pointer;
      svg {
        height: 3rem;
        width: 3rem;
        color: ${props => props.theme.mainColor};
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
        background-color:inherit;
      }
    }
`;

interface StyledArticleForm extends React.HTMLProps<HTMLElement> {

}
const ArticleForm = ({...rest}: StyledArticleForm) => {

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    console.log(paragraphData)
    return (
        <StyledArticleForm>
                <Input placeholder={"Titre de l'article"}/>
                <section className={"paragraph-plus-images"}>
                    {paragraphData && paragraphData.map((e, i) => (
                        <div key={i} className={'paragraph-form-container'}>
                            <TextArea
                                title={"Paragraphe"}
                                placeholder={'Paragraphe'}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(addingTextToParagraph({text :e.target.value, index: i})) }
                            />
                            <AddImages paragraphIndex={i} />
                            <div className={"paragraph-form-button paragraph-number-container"}>
                                <strong>{i + 1}</strong>
                            </div>
                            <div className={"paragraph-form-button button-plus-container"}>
                                <button onClick={() => dispatch(addParagraph())}>
                                    <BiPlusCircle className={'icon'} />
                                </button>
                            </div>
                            <div className={ i === 0 && paragraphData.length === 1 ?
                                "icon-not-clickable paragraph-form-button button-minus-container" :
                                "paragraph-form-button button-minus-container"
                            }>
                                <button onClick={() => dispatch(removeParagraph({index: i}))}>
                                    <BiMinusCircle className={'icon'} />
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
        </StyledArticleForm>
    )
}

export default ArticleForm;
