import React, {useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";
import StyledPage from "../styles/PageStyle";
import ToggleButton from "../components/utility/ToggleButton";
import ArticleForm from "../components/view/ArticleForm";
import ArticlePreview from "../components/view/ArticlePreview";
import {TToggleButton} from "../utils/config";

const StyledCreateArticlePage: IStyledComponent<any> = styled.main`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  padding: 0;
  background-color: #dfe0e3;

  #button-plus-form-container {
    display: flex;
    gap: 2rem;                                                    
    flex-direction: column;
    align-items: center;
    width: 100%;
    //max-width: 55rem;
  }
  
  @media (max-width: ${props => props.theme.responsiveValue}) {
      width: 100%;
  }
`;


const CreateArticle = () => {

    const  [isOnFormView, setIsOnFormView] = useState<string>('form');

    const buttonsFullPageViewList: TToggleButton[] = [
        {title: "Formulaire", callBack: () => setIsOnFormView('form')},
        {title: "Aperçu", callBack: () => setIsOnFormView('preview')},
    ];


    return(
        <StyledPage>
            <Header />
            <StyledCreateArticlePage>
                <div id={"button-plus-form-container"}>
                    <ToggleButton  buttons={buttonsFullPageViewList} />
                    {
                        {
                            'form': <ArticleForm />,
                            'preview': <ArticlePreview />
                        }[isOnFormView]
                    }
                </div>
            </StyledCreateArticlePage>
        </StyledPage>
    )
}


export default React.memo(CreateArticle);
