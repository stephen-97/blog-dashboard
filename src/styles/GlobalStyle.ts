import {createGlobalStyle} from 'styled-components';
import CSSVariables from './CSSVariables';

const GlobalStyle = createGlobalStyle`
  ${CSSVariables}
  
  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html, body {
    position: relative;
  }
  
  #root {
    position: relative;
    height: 100%;
  }
  
  h1, h2, h3, h4 {
    padding: 0;
    margin: 0;
  }
  
  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .line {
    height: 2px;
    background-color: aliceblue;
    width: 100%;
  }
  
  a {
    text-decoration: none;
    color: whitesmoke;
    cursor: pointer;
  }
  
  input:not([type='image']), textarea {
    border: 2px solid ${props => props.theme.mainColor};
    outline: none;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 1rem;
    background-color: transparent;
  }
  
  button, input[type="submit"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;

export default GlobalStyle;