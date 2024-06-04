import React from "react";
import styled from "styled-components";
import {BiMinusCircle} from "react-icons/bi";
import colors from "../../../styles/colors";


const StyledBlockTitle = styled.div`
    display: flex;
    align-items: center;
    h3 {
        text-transform: uppercase;
        margin-bottom: 0.5rem;
        position: relative;   
    }
    
    div {
        display: flex;
        margin-left: auto;
        gap: 1rem;
        span {
            font-size: 2rem;
        }
    }
`;

interface AddImagesProps extends React.HTMLProps<HTMLDivElement> {
    title: string,
    index: number
    setDeleteBlock: () => any,
}

const BlockTitle = (props: AddImagesProps) => {

    return (
        <StyledBlockTitle>
            <h3>{props.title}</h3>
            <div>
                <span>{props.index}</span>
                <button>
                    <BiMinusCircle onClick={props.setDeleteBlock} className={colors.darkBlue} size={35}/>
                </button>
            </div>
        </StyledBlockTitle>
    )
}

export default React.memo(BlockTitle);