import React, {ChangeEvent} from "react";
import styled, {IStyledComponent} from "styled-components";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import AddImages from "../form/AddImages";
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {addingTextToParagraph, addParagraph, removeBlock} from "../../redux/ArticleSlice";
import colors from "../../styles/colors";

const StyledArticleForm: IStyledComponent<any> = styled.section`
  min-width: 100%;
  flex: 1;
  
  .input-title {
    width: 50%;
  }
  .paragraph-plus-images {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    > * { 
      flex: 0 0  calc(50% - 2rem);
    }
    .paragraph-form-container {
      background-color: var(--white);
      padding: 1rem 1rem 1rem 1rem;
      display: grid;
      //margin-bottom: 4rem;
      height: 30rem;
      border-radius: var(--border-radius);
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(6, 1fr);
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
          grid-area: 1 / 1 / 5 / 8;
        }
        &:nth-child(2) {
          grid-area: 5 / 1 / 7 / 8;
        }
        &:nth-child(3) {
          grid-area: 1 / 8 / 3 / 9;
        }
        &:nth-child(4) {
          grid-area: 3 / 8 / 5 / 9;
        }
        &:nth-child(5) {
          grid-area: 5 / 8 / 7 / 9;
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
          background-color:inherit;
        }
      }
  }
`;

interface StyledArticleForm extends React.HTMLProps<HTMLElement> {

}
const ArticleForm = ({...rest}: StyledArticleForm) => {

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const AddBlockIsOk = (index: number): boolean => {
        return true;
        if(paragraphData[index].paragraph !== '')
            return true
        for(let i =0; i < paragraphData[index].images.length; i++) {
            if(paragraphData[index].images[i] !== '')
                return true
        }
        return false;
    }

    return (
        <StyledArticleForm>
                <Input placeholder={"Titre de l'article"} className={'input-title'}/>
                <ul className={"paragraph-plus-images"}>
                    {paragraphData && paragraphData.map((e, i) => (
                        <li key={i} className={'paragraph-form-container'}>
                            <TextArea
                                title={"Paragraphe"}
                                placeholder={'Paragraphe'}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(addingTextToParagraph({text :e.target.value, index: i})) }
                                value={paragraphData[i]['paragraph']}
                            />
                            <AddImages paragraphIndex={i} />
                            <div className={"paragraph-form-button paragraph-number-container"}>
                                <strong>{i + 1}</strong>
                            </div>
                            <div className={"paragraph-form-button button-plus-container"}>
                                <button onClick={() => AddBlockIsOk(i) ? dispatch(addParagraph()) : alert("Il faut ajouter du contenu avant de créer un nouveau block")}>
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
                        </li>
                    ))}
                </ul>
        </StyledArticleForm>
    )
}

export default ArticleForm;
