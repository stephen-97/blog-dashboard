import React, {createRef, useCallback, useMemo} from "react";
import styled, {IStyledComponent} from "styled-components";
import {onChangeTextImage} from "../../redux/ArticleSlice";
import { BiPlusCircle } from "react-icons/bi";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import { IoCloseOutline } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import {TArticleTextImage} from "../../utils/config";

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

interface AddImagesProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
    paragraphIndex: number,
}

const AddImages = ({ paragraphIndex,...rest}: AddImagesProps) => {

    const imagesNumber = 3;

    const paragraphData = useAppSelector((state) => state.article)
    const currentTextImage = paragraphData[paragraphIndex] as TArticleTextImage;
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
                    if(image.width/image.height !== 1920/1080) {
                        //alert("Mauvais format image, l'aspect ratio doit être de 16:9");
                        //return
                    }
                    callBack(image.src ?? "")
                }
            }
        }
    }

    const addingNewImage = (
        indexBlock: number,
        indexImage: number,
        e: React.ChangeEvent<HTMLInputElement>,
    ) =>  {
        getBase64(e, (base64String: string | null) => {
            if(base64String) {
                let newTextImageObject = {...currentTextImage};
                let dataImage = [...newTextImageObject['images']];
                dataImage[indexImage] = base64String;
                newTextImageObject['images'] = dataImage;
                dispatch(onChangeTextImage({textImage: newTextImageObject, index: indexBlock}));
            }
        })
    }



    const removeAnImage = useCallback(( indexBlock: number, indexImage: number) => {
        let newTextImageObject = {...currentTextImage};
        let dataImage = [...newTextImageObject['images']];
        dataImage[indexImage] = '';
        newTextImageObject['images'] = dataImage;
        dispatch(onChangeTextImage({textImage: newTextImageObject, index: indexBlock}));
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
                    style={currentTextImage['images'][i] !== '' ? {backgroundImage: `url(${paragraphData[paragraphIndex]['images'][i]})`} : {}}
                >
                    <button className={"button-add-image"} onClick={() => inputRefs[i].current?.click()}></button>
                    {currentTextImage['images'][i] !== '' &&
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
                        accept={"image/png, image/jpeg, image/webp"}
                        placeholder={""}
                        onChange={(e) => addingNewImage(paragraphIndex, i,  e) }
                    />
                    {currentTextImage['images'][i] === '' && <FaImage className={'icon-add'} /> }
                </div>
            ))}
        </StyledAddImages>
    )
}

export default React.memo(AddImages);