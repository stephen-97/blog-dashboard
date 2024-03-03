import React, {createRef, useCallback, useMemo} from "react";
import styled, {IStyledComponent} from "styled-components";
import { BiPlusCircle } from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import { IoCloseOutline } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import {addNewImage, removeImage} from "../../redux/ArticleSlice";

const StyledAddImages: IStyledComponent<any> = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  
  
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
    background-size: 100%;

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

interface AddImagesProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
    paragraphIndex: number,
}

const AddImages = ({ paragraphIndex,...rest}: AddImagesProps) => {

    const imagesNumber = 3;

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const getBase64 =  (e: React.ChangeEvent<HTMLInputElement>, callBack: Function) => {
        //let base64String: string  = ""
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result as string;
                image.onload= () => {
                    //console.log(image.width, image.height)
                    callBack(image.src ?? "")
                }
            }
        }
    }

    const addingNewImage = (
        indexToAddParagraphArray: number,
        indexToAddImageArray: number,
        e: React.ChangeEvent<HTMLInputElement>,
    ) =>  {
        getBase64(e, (base64String: string | null) => {
            if(base64String) {
                dispatch(addNewImage({indexParagraph: indexToAddParagraphArray, indexImage: indexToAddImageArray, base64: base64String}))
            }
        })
    }

    const removeAnImage = useCallback(( indexParagraph: number, indexImage: number) => {
        dispatch(removeImage({indexImage: indexImage, indexParagraph: indexParagraph}))
    },  [paragraphData])


    const inputRefs = useMemo(() => {
        const inputTabRefs = [];
        for(let i=0; i <imagesNumber; i++) {
            inputTabRefs.push(createRef<HTMLInputElement>())
        }
        return inputTabRefs
    },  [imagesNumber])



    return (
        <StyledAddImages>
            {Array.from(Array(imagesNumber), (e, i) => (
                <div
                    key={i}
                    className={'input-image-container'}
                    style={paragraphData[paragraphIndex]['images'][i] !== '' ? {backgroundImage: `url(${paragraphData[paragraphIndex]['images'][i]})`} : {}}
                >
                    <button className={"button-add-image"} onClick={() => inputRefs[i].current?.click()}></button>
                    {paragraphData[paragraphIndex]['images'][i] !== '' &&
                        <button className={"button-rm-image"} onClick={() => removeAnImage(paragraphIndex, i)}>
                            <IoCloseOutline className={'icon-rm'}/>
                        </button>
                    }
                    <input
                        ref={inputRefs[i]}
                        className={'input'}
                        title={""}
                        type={"file"}
                        alt={''}
                        accept={"image/png, image/jpeg"}
                        placeholder={""}
                        onChange={(e) => addingNewImage(paragraphIndex, i,  e) }
                    />
                    {paragraphData[paragraphIndex]['images'][i] === '' && <FaImage className={'icon-add'} /> }
                </div>
            ))}
        </StyledAddImages>
    )
}

/**
 * onChange={(e) =>
 *                             setImage((previous: any) => addingNewImage(paragraphIndex, i, previous, getBase64(e)) )}
 */
export default AddImages;