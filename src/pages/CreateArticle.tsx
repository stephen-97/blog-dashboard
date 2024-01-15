import React, {useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";
import StyledPage from "../styles/PageStyle";
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import AddImages from "../components/form/AddImages";
import {TAritcleContent} from "../utils/config";
import {BiPlusCircle} from "react-icons/bi";


const StyledCreateArticlePage: IStyledComponent<any> = styled.main`
  outline: none;

  #form-section {
    width: ${props => props.theme.formSectionWidth};
    > * {
      padding: 0 2rem;
    }
  }
    @media (max-width: ${props => props.theme.responsiveValue}) {
      align-items: center;
      width: 100%;
    }

    .paragraph-form-container {
      margin-bottom: 2rem;
      background-color: deepskyblue;
      border-radius: var(--border-radius);
      display: grid;
      grid-template-columns: 4fr 4fr 1fr;
      grid-template-rows: 1fr;
      //gap: 1rem;
      flex-direction: column;
      > * {
        &:nth-child(1) {
          grid-column-start: 1;
          grid-column-end: 3;
        }
        &:nth-child(2) {
          grid-column-start: 1;
          grid-column-end: 3;
        }
        &:nth-child(3) {
          grid-column-start: 3;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 3;
        }
      }
      .button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          border-radius: var(--border-radius);
          height: 4rem;
          width: 4rem;
          color: ${props => props.theme.secondaryColor};
          svg {
            height: 3rem;
            width: 3rem;
            color: ${props => props.theme.mainColor};
        } 
      }
    }
  }
`;

const CreateArticle = () => {

    const [nbOfParagraph, setNumberOfParagraph] = useState<number>(1)
    const [paragraphData, setParagraphData] = useState<TAritcleContent[]>([{paragraph: '', images: []}])

    return(
        <StyledPage>
            <Header />
            <StyledCreateArticlePage>
                <section id={'form-section'}>
                    <Input placeholder={"Titre de l'article"}/>
                    <section>
                        {paragraphData.map((e, i) => (
                            <div key={i} className={'paragraph-form-container'}>
                                <TextArea title={"Paragraphe"} placeholder={'Paragraphe'} />
                                <AddImages />
                                <div className={"button-container"}>
                                    <button onClick={() => null}>
                                        <BiPlusCircle className={'icon'} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                </section>
            </StyledCreateArticlePage>
        </StyledPage>
    )
}


export default CreateArticle;

/**
 *  grid-template-columns: 1fr 1fr 1fr;
 *       grid-template-rows: 1fr 1fr;
 *       //gap: 1rem;
 *       flex-direction: column;
 *       > * {
 *         &:nth-child(1) {
 *           grid-column-start: 1;
 *           grid-column-end: 2;
 *         }
 *         &:nth-child(2) {
 *           grid-column-start: 1;
 *           grid-column-end: 2;
 *         }
 *         &:nth-child(3) {
 *           grid-column-start: 2;
 *           grid-column-end: 2;
 *           grid-row-start: 1;
 *           grid-row-end: 2;
 *         }
 *       }
 */