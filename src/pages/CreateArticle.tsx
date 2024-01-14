import React from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";
import StyledPage from "../styles/PageStyle";
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";
import AddImages from "../components/form/AddImages";


const StyledCreateArticlePage: IStyledComponent<any> = styled.main`
  outline: none;

  #form-section {
    width: ${props => props.theme.formSectionWidth};

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
                <section id={'form-section'}>
                    <Input title={"Titre de l'article"} />
                    <section>
                        <TextArea title={"Paragraphe"} aria-placeholder={'Paragrape'} />
                        <AddImages />
                        <button>Rajouter un paragraphe</button>
                    </section>
                </section>
            </StyledCreateArticlePage>
        </StyledPage>
    )
}


export default CreateArticle;