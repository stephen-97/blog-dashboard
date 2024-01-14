import {css, RuleSet} from "styled-components";

const CSSVariables: RuleSet<object> = css`
    :root {
      --gray: #9696a2;
      --light-gray: #d9d9d9;
      --white: whitesmoke;
      --dark-blue: #31304e;
      --dark-gray: #3e3e47;
      
      --h1: 30px;
      --h2: 24px;
      
      --responsive-value: 700px;
      
      --border-radius: 0.8rem;
    }
`;

export default CSSVariables;