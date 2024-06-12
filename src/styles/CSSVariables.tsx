import {css, RuleSet} from "styled-components";
import colors from "./colors";

const CSSVariables: RuleSet<object> = css`
    :root {
        --gray: ${colors.gray};
        --light-gray: ${colors.lightGray};
        --light-gray-2: ${colors.lightGray2};
        --white: ${colors.white};
        --dark-blue: ${colors.darkBlue};
        --dark-gray: ${colors.darkGray};
        --dark-gray-2: ${colors.darkGray2};
        --blue: ${colors.blue};
        --red: ${colors.red};

        // Previews colors 
        --primary: #FFFFFF;
        --secondary: #F2F2F2;
        --tertiary: #dfdfdf;
        --quartenary: #4f504c;
        --five: #e7e7e7;
        --six: #c4c4c4;
        --hover: #33333350;

        --h1: clamp(1.8rem, 1.1rem + 2.24vw, 2.5rem);
        --h2: clamp(1.8rem, 1.4rem + 1.28vw, 2.2rem);
        --h3: clamp(1.625rem, 1.25rem + 1.2vw, 2rem);
        
        //--h1: clamp(2rem, 0.75rem + 4vw, 3rem);
        //--h2: 24px;
        //--h3: clamp(1.65rem, 1.2125rem + 1.4vw, 2rem);;

        --responsive-value: 700px;
        --border-radius-s: 0.5rem;
        --border-radius: 0.8rem;
        --border-radius-large: 1.1rem;

        --xlarge: 1.2rem;
        --xxlarge: 1.3rem;
        
        --max-width-input: 50rem;
    }
`;

export default CSSVariables;