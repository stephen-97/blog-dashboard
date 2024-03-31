import React, {createRef} from "react";
import styled, {IStyledComponent} from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import {addNewMainImage} from "../../redux/ArticleMainImage";
import {useAppDispatch, useAppSelector} from "../../redux/store";


const StyledMainImage: IStyledComponent<any> = styled.div`
  
  label {
    display: block;
  }
  .mainImage-input-container {
    position: relative;
    display: inline-block;
    button {
      height: 6rem;
      width: 6rem;
      border-radius: 100px;
      background-color: red;
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
  }
`;

interface StyledMainImageProps extends React.HTMLProps<HTMLDivElement> {
    label: string
}
const TextArea = ({label, ...props}: StyledMainImageProps) => {

    const inputMainImageRef = createRef<HTMLInputElement>();
    const dispatch = useAppDispatch()
    const mainImageBase64: string = useAppSelector((state) => state.articleMainImage)


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

    const addingMainImage = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        getBase64(e, (image: HTMLImageElement) => {
            if(image) {
                dispatch(addNewMainImage({ base64: image.src}))
            }
        })
    }

    return (
        <StyledMainImage {...props}>
            <label form={"mainImage"}>{label}</label>
            <div className={'mainImage-input-container'}>
                <button
                    className={"button-add-image"}
                    onClick={() => inputMainImageRef.current?.click()}
                    style={mainImageBase64 !== '' ? {backgroundImage: `url(${mainImageBase64})`} : {}}
                />
                <input
                    ref={inputMainImageRef}
                    type={'file'}
                    id={"mainImage"}
                    name={"mainImage"}
                    accept={"image/png, image/jpeg, image/webp"}
                    alt={''}
                    placeholder={""}
                    onChange={(e) => addingMainImage(e)}
                />
                <FaPlusCircle />
            </div>
        </StyledMainImage>
    )
}

export default TextArea;