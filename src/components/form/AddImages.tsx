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
    paragraphIndex: number
}

const AddImages = ({ paragraphIndex, imagesData, setImage,...rest}: AddImagesProps) => {


    const getBase64 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let base64String: string  = ""
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            await new Promise(resolve => reader.onload = () => resolve);
            base64String = reader.result as string;
        }
        return base64String
    }

    const addingNewImage = async (
        indexToAddParagraphArray: number,
        indexToAddImageArray: number,
        array: [TAritcleContent],
        base64NewImage: Promise <string>,
        e: React.ChangeEvent<HTMLInputElement>,
    ) =>  {
        let base64String: string  = ""
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            base64String = await reader.result as string;
        }
        console.log(base64String)
        const paragraphToModify = array[indexToAddParagraphArray];
        const newImageArray = paragraphToModify.images.map((e: string, i: number) => i === indexToAddImageArray ? base64String : e);
        const newParagraph = paragraphToModify['images'] = newImageArray;
        return array.map((e, i) => indexToAddParagraphArray ? newParagraph : e);
    }

    console.log(imagesData)
    return (
        <StyledAddImages>
            {Array.from(Array(3), (e, i) => (
                <div key={i} className={'input-image-container'}>
                    <input
                        type={"file"}
                        alt={''}
                        accept={"image/png"}
                        onChange={(e) =>
                            setImage((previous: any) => addingNewImage(paragraphIndex, i, previous, getBase64(e), e) )}
                        //onChange={(e) => setImage((previous: any) => spliceWithoutMutating(i, handleChange(e), previous) )}
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