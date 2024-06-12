import React, {createRef, RefObject} from "react";
import styled, {IStyledComponent} from "styled-components";
import {routesItem} from "../../utils/config";
import {Link} from "react-router-dom";
import menuIcon from "../../assets/menuIcon.svg"
import { IoIosCreate } from "react-icons/io";
import {BiMinusCircle} from "react-icons/bi";
import colors from "../../styles/colors";

const StyledHeader: IStyledComponent<any> = styled.header`
  position: fixed;
  height: 100%;
  z-index: 1000;
  display: grid;
  grid-template-rows: 6rem 1fr;
  padding: 0 10px;
  width: ${props => props.theme.dashboard_menu_desktop_width };
  min-width: ${props => props.theme.dashboard_menu_desktop_width };

  background-color: ${props => props.theme.mainColor};
  margin: 0;
  
  
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .link {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.8rem 0 0.8rem 15px;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 100px;
      svg {
        transform: scale(1.25);
      }
      &:hover, &.selected-link {
        background-color: ${props => props.theme.secondaryColor};
        color: #282c34;
      }
    }
  }

  #title-container {
    display: flex;
    align-items: center;

    h2 {
      padding: 0 0 0 15px;
      margin: 0;
      color: whitesmoke;
    }
    #menu-icon-container {
      display: none;
    }
  }

  .header-item {
    padding: 0.8rem 0 0.8rem 15px;
    font-size: 1.2rem;
    color: whitesmoke;
    cursor: pointer;

  }

  @media (max-width: ${props => props.theme.responsiveValue}) {
    top: 0;
    width: 100vw;
    padding: 0;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #title-container {
      display: flex;
      height: 80px;
      justify-content: space-between;
      width: 95%;
      margin: 0;
      
      h2 {
        padding: 0;
      }
      #menu-icon-container {
        display: block;
        cursor: pointer;
      }
    }
    ul {
      position: relative;
      display: none;
      transition: 0.5s ease-in-out;
      z-index: 1000;
      height: 0;
      width: 100%;
    }
  }

`;
const Header = () => {
    const pathname = window.location.pathname;

    const menuRef: RefObject<HTMLUListElement> = createRef();

    const toggleMenu = (): void => {
        const menuHeight = window.getComputedStyle(menuRef.current as Element).getPropertyValue('height');
        if(menuHeight === '0px') {
            menuRef.current!.style.height = 'auto';
            menuRef.current!.style.display = 'block';
        } else {
            menuRef.current!.style.height = '0px';
            menuRef.current!.style.display = 'none';
        }
    }

    return (
        <StyledHeader>
            <section id={'title-container'}>
                <h2 id={'dashboard-Title'}>Dashboard</h2>
                <div id={'menu-icon-container'} onClick={() => toggleMenu()}>
                    <img src={menuIcon} alt={'menu Icon'}/>
                </div>
            </section>
            <ul ref={menuRef}>
                {routesItem.map((elem, index) =>
                    <li key={index}>
                        <Link
                            to={`/${elem.routeName}`}
                            className={`${pathname === '/' + elem.routeName ? 'link selected-link' : 'link'}`}
                        >
                            {elem.icon}
                            <span>{elem.routeName}</span>
                        </Link>
                    </li>
                )}
            </ul>
        </StyledHeader>
    )
}

// {index === 0 && <div className={'line'}></div>}

export default Header;