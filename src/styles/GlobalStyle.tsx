import {createGlobalStyle} from 'styled-components';
import CSSVariables from './CSSVariables';

const GlobalStyle = createGlobalStyle`
  ${CSSVariables}
  h1, h2, h3, h4 {
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
`;

export default GlobalStyle;