import React from "react";
import styled, {IStyledComponent} from "styled-components";
import Header from "../components/Header";

const StyledHome: IStyledComponent<any>  = styled.div`
  height: 100vh;
  width: 100vw;
  
  main {
    margin-left: ${props => props.theme.dashboard_menu_desktop_width};
  }
  
  @media (max-width: 480px) {
    font-size: var(--fz-lg);
  }
`;

const Home = () => {

    return(
        <StyledHome>
            <Header />
            <main className={'main'}>Hey</main>
        </StyledHome>
    )
}


export default Home;