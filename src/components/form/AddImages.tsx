import React from "react";
import styled, {IStyledComponent} from "styled-components";
import { BiPlusCircle } from "react-icons/bi";

const StyledAddImages: IStyledComponent<any> = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  height: 7rem;
  
  .input-image-container {
    background-color: ${props => props.theme.mainColor};
    position: relative;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    //min-width: 7rem;
    height: 100%;
    border-radius: var(--border-radius);
    cursor: pointer;
    overflow: hidden;
    
    input {
      height: 100%;
      width: 100%;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      height: 2rem;
      width: 2rem;
    }
  }
`;

interface AddImagesProps extends React.HtmlHTMLAttributes<HTMLInputElement> {

}

const AddImages = ({ ...rest}: AddImagesProps) => {

    return (
        <StyledAddImages>
            {Array.from(Array(3), (e, i) => (
                <div key={i} className={'input-image-container'}>
                    <input type={"image"} alt={''} />
                    <BiPlusCircle className={'icon'} />
                </div>
            ))}
        </StyledAddImages>
    )
}

export default AddImages;