
import Input from "./Input";
import React, {ChangeEvent, createRef, useCallback, useMemo} from "react";
import TextArea from "./TextArea";
import AddImages from "./AddImages";
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi";
import colors from "../../styles/colors";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import styled from "styled-components";
import {IoCloseOutline} from "react-icons/io5";
import {FaImage} from "react-icons/fa";



const StyledImagesBlock = styled.li`
  height: 38rem;
  padding: 1rem;
  background-color: var(--white);
  border-radius: var(--border-radius);

  h3 {
    text-transform: uppercase;
  }

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
    background-position: center;
    background-size: auto 100%;

    input {
      display: none;
    }

    .button-add-image {
      height: 100%;
      width: 100%;
      background: transparent;
      z-index: 0;
    }

    .button-rm-image {
      height: 2rem;
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      z-index: 2;
      .icon-rm {
        height: 2rem;
        width: 2rem;
      }
    }

    .icon-add {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 2rem;
      width: 2rem;
      z-index: 0;
      pointer-events: none;
    }
  }
`;

interface SwiperBlockProps extends React.HTMLProps<HTMLLIElement> {
    i: number,
    e: any,
}

const ImagesBlock = ({i, e, ...rest}: SwiperBlockProps) => {

    const imagesNumber = 9;


    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const AddBlockIsOk = (index: number): boolean => {
        return true;
        /**
         * if(paragraphData[index].paragraph !== '')
         *             return true
         *         for(let i =0; i < paragraphData[index].images.length; i++) {
         *             if(paragraphData[index].images[i] !== '')
         *                 return true
         *         }
         *         return false;
         */
    }

    const inputRefs = useMemo(() => {
        const inputTabRefs = [];
        for(let i=0; i <imagesNumber; i++) {
            inputTabRefs.push(createRef<HTMLInputElement>())
        }
        return inputTabRefs
    },  [imagesNumber])

    const getBase64 =  (e: React.ChangeEvent<HTMLInputElement>, callBack: Function) => {
        //let base64String: string  = ""
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result as string;
                image.onload= () => {
                    if(image.width/image.height !== 1920/1080) {
                        alert("Mauvais format image, l'aspect ratio doit être de 16:9");
                        return
                    }
                    callBack(image.src ?? "")
                }
            }
        }
    }


    return (
        <StyledImagesBlock {...rest}>
            <h3>Screens pour Slider</h3>
            <ul>
                {Array.from(Array(imagesNumber), (e, i) => (
                    <li
                        key={i}
                        className={'input-image-container'}
                        //style={paragraphData[paragraphIndex]['images'][i] !== '' ? {backgroundImage: `url(${paragraphData[paragraphIndex]['images'][i]})`} : {}}
                    >
                        <button className={"button-add-image"} onClick={() => inputRefs[i].current?.click()}></button>

                        <input
                            ref={inputRefs[i]}
                            className={'input'}
                            title={""}
                            type={"file"}
                            alt={''}
                            accept={"image/png, image/jpeg, image/webp"}
                            placeholder={""}
                        />
                    </li>
                ))}
                <li>
                    <button></button>
                </li>
            </ul>
        </StyledImagesBlock>
    )
}

export default ImagesBlock

//                        {paragraphData[paragraphIndex]['images'][i] === '' && <FaImage className={'icon-add'} /> }