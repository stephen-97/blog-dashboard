import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";
import StyledPage from "../styles/PageStyle";
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import AddImages from "../components/form/AddImages";
import {TAritcleContent} from "../utils/config";
import {BiPlusCircle, BiMinusCircle} from "react-icons/bi";
import {prettyFormat} from "@testing-library/react";


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
      display: grid;
      margin-bottom: 4rem;
      height: 25rem;
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
  }
`;


const CreateArticle = () => {

    const [paragraphData, setParagraphData] = useState<TAritcleContent[]>([{paragraph: '', images: ["","",""]}])

    const addParagraph = useCallback(() => {
        setParagraphData([...paragraphData, {paragraph: '', images: ["", "", ""]}])
    }, [paragraphData])

    const removeParagraph = useCallback((i: number) => {
        setParagraphData(previous => previous.slice(i))
    }, [paragraphData])


    const addingTextToParagraph = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        setParagraphData((previousData: TAritcleContent[]) =>
            previousData.map((e, i) => {
                    if(i === index) {
                        let newParagraphObject = e;
                        newParagraphObject['paragraph'] = event.target.value;
                        return newParagraphObject;
                    }
                    return e;
                }
            )
        )
    }

    /**
     *     const addingTextToParagraph = (event: FormEvent<HTMLTextAreaElement>, index: number) => {
     *         setParagraphData((previousData: TAritcleContent[]) => {
     *             previousData.map((e, i) =>
     *                 i === index ? e['paragraph'] = event.target : e
     *             )
     *         })
     *     }
     *
     * if(indexToAddParagraphArray === i ) {
     *                         const newImageTab = e.images.map((e: string,i: number) => indexToAddImageArray === i ? base64String : e);
     *                         let newParagraphObject = e;
     *                         newParagraphObject['images'] = newImageTab;
     *                         return newParagraphObject
     *                     }
     *                     return e
     */

    console.log(paragraphData)
    return(
        <StyledPage>
            <Header />
            <StyledCreateArticlePage>
                <section id={'form-section'}>
                    <Input placeholder={"Titre de l'article"}/>
                    <section>
                        {paragraphData && paragraphData.map((e, i) => (
                            <div key={i} className={'paragraph-form-container'}>
                                <TextArea
                                    title={"Paragraphe"}
                                    placeholder={'Paragraphe'}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => addingTextToParagraph(e, i) }
                                />
                                <AddImages
                                    imagesData={paragraphData[i].images}
                                    setImage={setParagraphData}
                                    paragraphIndex={i}
                                />
                                <div className={"paragraph-form-button paragraph-number-container"}>
                                    <strong>{i + 1}</strong>
                                </div>
                                <div className={"paragraph-form-button button-plus-container"}>
                                    <button onClick={() => addParagraph()}>
                                        <BiPlusCircle className={'icon'} />
                                    </button>
                                </div>
                                <div className={ i === 0 && paragraphData.length === 1 ?
                                    "icon-not-clickable paragraph-form-button button-minus-container" :
                                    "paragraph-form-button button-minus-container"
                                }>
                                    <button onClick={() => removeParagraph(i)}>
                                        <BiMinusCircle className={'icon'} />
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
