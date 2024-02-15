import React from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";
import StyledPage from "../styles/PageStyle";
import ToggleButton from "../components/utility/ToggleButton";
import ArticleForm from "../components/view/ArticleForm";

const StyledCreateArticlePage: IStyledComponent<any> = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0;

  #button-plus-form-container {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 55rem;
  }
  
  @media (max-width: ${props => props.theme.responsiveValue}) {
      align-items: center;
      width: 100%;
  }
`;


const CreateArticle = () => {

    return(
        <StyledPage>
            <Header />
            <StyledCreateArticlePage>
                <div id={"button-plus-form-container"}>
                    <ToggleButton />
                    <ArticleForm />
                </div>
            </StyledCreateArticlePage>
        </StyledPage>
    )
}


export default CreateArticle;
