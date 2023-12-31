import React from "react";
import styled, {IStyledComponent} from "styled-components";
import {routesItem} from "../utils/config";
import {Link} from "react-router-dom";
import menuIcon from "../assets/menuIcon.svg"

const StyledHeader: IStyledComponent<any> = styled.header`
  display: grid;
  grid-template-rows: 12% 88%;
  height: 100vh;
  width: 220px;
  background-color: var(--dark-blue);
  margin: 0;

  .link {
    display: block;
    padding: 0.8rem 0 0.8rem 15px;
    font-size: 1.2rem;
    color: whitesmoke;
    cursor: pointer;
  }

  .selected-link {
    background-color: aliceblue;
    color: #282c34;
  }

  #title-container {
    display: flex;
    align-items: center;

    h2 {
      padding: 0 0 0 15px;
      margin: 0;
      color: whitesmoke;
    }
  }

  .header-item {
    padding: 0.8rem 0 0.8rem 15px;
    font-size: 1.2rem;
    color: whitesmoke;
    cursor: pointer;

  }

  @media (max-width: 700px) {
    height: 80px;
    width: 100vw;
    display: flex;

    #title-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 0 20px;
      
      h2 {
        padding: 0;
      }
      #menu-icon-container {
        cursor: pointer;
      }
    }
    ul {
      display: none;
    }
  }

`;
const Header = () => {
    const pathname = window.location.pathname;


    return (
        <StyledHeader>
            <section id={'title-container'}>
                <h2 id={'dashboard-Title'}>Dashboard</h2>
                <div id={'menu-icon-container'}>
                    <img src={menuIcon} alt={'menu Icon'}/>
                </div>
            </section>
            <ul>
                {routesItem.map((elem, index) =>
                    <li key={index}>
                        {index === 0 && <div className={'line'}></div>}
                        <Link
                            to={`/${elem.routeName}`}
                            className={`${pathname === '/' + elem.routeName ? 'link selected-link' : 'link'}`}
                        >
                            {elem.routeName}
                        </Link>
                        <div className={'line'}></div>
                    </li>
                )}
            </ul>
        </StyledHeader>
    )
}


export default Header;