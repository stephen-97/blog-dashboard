import React, {createRef} from "react";
import styled, {IStyledComponent} from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import {addNewSecondMainImage, addNewFirstMainImage} from "../../redux/ArticleMainImages";
import {useAppDispatch, useAppSelector} from "../../redux/store";

const StyledMainImage: IStyledComponent<any> = styled.div`
  
  label {
    display: block;
  }
  .main-second-image-container {
    display: flex;
    gap: 1rem;
    .mainImage-input-container {
      position: relative;
      display: flex;
      align-items: end;
      button {
        height: 6rem;
        width: 6rem;
        border-radius: 100px;
        background-color: #282c34;
        background-position: center;
        background-size: auto 100%;
      }

      input {
        display: none;
      }

      svg {
        position: absolute;
        bottom: 0;
        right: 0;
        height: 1.5rem;
        width: auto;
        background-color: var(--white);
        border-radius: 20rem;
      }
      &.secondImage {
        button {
          height: 4rem;
          width: 4rem;
          border-radius: 100px;
          background-position: center;
          background-size: auto 100%;
        }
      }
    } 
  }
`;

interface StyledMainImageProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}
const TextArea = ({label, ...props}: StyledMainImageProps) => {

    const inputMainImageRef = createRef<HTMLInputElement>();
    const inputSecondImageRef = createRef<HTMLInputElement>()
    const dispatch = useAppDispatch()
    const mainImagesBase64 = useAppSelector((state) => state.articleMainImages)


    const getBase64 =  (e: React.ChangeEvent<HTMLInputElement>, callBack: Function) => {
        //let base64String: string  = ""
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                const image: HTMLImageElement = new Image();
                image.src = reader.result as string;
                image.onload= () => {
                    callBack(image ?? null)
                }
            }
        }
    }

    const addingFirstMainImage = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        getBase64(e, (image: HTMLImageElement) => {
            if(image) {
                dispatch(addNewFirstMainImage({ base64: image.src}))
            }
        })
    }

    const addingSecondMainImage = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        getBase64(e, (image: HTMLImageElement) => {
            if(image) {
                dispatch(addNewSecondMainImage({ base64: image.src}))
            }
        })
    }

    return (
        <StyledMainImage {...props}>
            <label form={"mainImage"}>{label}</label>
            <div className={"main-second-image-container"}>
                <div className={'mainImage-input-container firstImage'}>
                    <button
                        className={"button-add-image"}
                        onClick={() => inputMainImageRef.current?.click()}
                        style={mainImagesBase64.firstMainImage !== '' ? {backgroundImage: `url(${mainImagesBase64.firstMainImage})`} : {}}
                    />
                    <input
                        ref={inputMainImageRef}
                        type={'file'}
                        id={"mainImage"}
                        name={"mainImage"}
                        accept={"image/png, image/jpeg, image/webp"}
                        alt={''}
                        placeholder={""}
                        onChange={(e) => addingFirstMainImage(e)}
                    />
                    <FaPlusCircle />
                </div>
                <div className={'mainImage-input-container secondImage'}>
                    <button
                        className={"button-add-image"}
                        onClick={() => inputSecondImageRef.current?.click()}
                        style={mainImagesBase64.firstMainImage !== '' ? {backgroundImage: `url(${mainImagesBase64.secondMainImage})`} : {}}
                    />
                    <input
                        ref={inputSecondImageRef}
                        type={'file'}
                        id={"mainImage"}
                        name={"mainImage"}
                        accept={"image/png, image/jpeg, image/webp"}
                        alt={''}
                        placeholder={""}
                        onChange={(e) => addingSecondMainImage(e)}
                    />
                    <FaPlusCircle />
                </div>
            </div>
        </StyledMainImage>
    )
}

export default React.memo(TextArea);