import React, {useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import {TToggleButton} from "../../utils/config";

const StyledToggleButton = styled.div<{selectedButton: number}>`
  ul {
    position: relative;
    height: 3rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: fit-content;
    border: 0.2rem solid #38404e;
    border-radius: var(--border-radius);
    background: #38404e;
    font-weight: bold;
    color: #38404e;
    cursor: pointer;
    font-size: 1.1rem;
  }
  ul::before {
    content: '';
    position: absolute;
    width: 33.333%;
    height: 100%;
    left: ${ props => `${props.selectedButton * 33.333}%`};
    background: white;
    border-radius: var(--border-radius);
    transition: all 0.3s;
  }
  ul button {
    padding: 6px;
    text-align: center;
    z-index: 1;
  }
  ul button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
  }
  button {
    height: 100%;
    color: white;
  }
  .selected {
    color: #343434;
  }
`;


interface StyledToggleButtonProps extends React.HTMLProps<HTMLInputElement> {
    buttons: TToggleButton[];

}
const ToggleButton2 = ({ buttons,...rest}: StyledToggleButtonProps) => {

    const [selectedButton, setSelectedButton] = useState(0);

    const onClick = (i: number) => {
        setSelectedButton(i);
        buttons[i].callBack();
    }

    return (
        <StyledToggleButton selectedButton={selectedButton}>
            <ul >
                {buttons.map(({callBack, title}, i) =>
                    <button onClick={() => onClick(i)} className={selectedButton === i ? 'selected' : ''} >{title}</button>
                )}
            </ul>
        </StyledToggleButton>
    )
}

export default ToggleButton2;
