import React, {useEffect, useState} from "react";
import styled, {IStyledComponent} from "styled-components";
import { BiPlusCircle } from "react-icons/bi";
import {read} from "fs";
import {TAritcleContent} from "../../utils/config";
import {type} from "os";

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
    imagesData : [any] | [],
    setImage: React.Dispatch<any>,
    paragraphIndex: number,
    paragraphData: TAritcleContent[],
}

const AddImages = ({ paragraphIndex, imagesData, setImage, paragraphData,...rest}: AddImagesProps) => {


    const getBase64 =  (e: React.ChangeEvent<HTMLInputElement>, callBack: Function) => {
        let base64String: string  = ""
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                base64String = reader.result as string;
                callBack(base64String)
            }
        }
    }

    const addingNewImage = (
        indexToAddParagraphArray: number,
        indexToAddImageArray: number,
        array: TAritcleContent[],
        e: React.ChangeEvent<HTMLInputElement>,
    ) =>  {
        getBase64(e, (base64String: string | null) => {
            if(base64String) {
                setImage(array.map((e, i) => {
                    if(indexToAddParagraphArray === i ) {
                        const newImageTab = e.images.map((e: string,i: number) => indexToAddImageArray === i ? base64String : e);
                        let newParagraphObject = e;
                        newParagraphObject['images'] = newImageTab;
                        return newParagraphObject
                    }
                    return e
                }));
            }
        })
    }

    return (
        <StyledAddImages>
            {Array.from(Array(3), (e, i) => (
                <div key={i} className={'input-image-container'}>
                    <input
                        type={"file"}
                        alt={''}
                        accept={"image/png"}
                        onChange={(e) =>
                          addingNewImage(paragraphIndex, i, paragraphData,  e) }
                    />
                    <BiPlusCircle className={'icon'} />
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