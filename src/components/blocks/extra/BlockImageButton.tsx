import React, {RefObject} from "react";
import styled, {IStyledComponent} from "styled-components";
import {IoCloseOutline} from "react-icons/io5";

const StyledImageButton: IStyledComponent<any> = styled.div`
   
`;

interface ImageButtonProps extends React.HTMLProps<HTMLDivElement> {
    inputRef: RefObject<HTMLInputElement>,
    addImage: any,
    removeImage: any
}

const BlockImageButton = ({inputRef, addImage, removeImage}: ImageButtonProps) => {


    return (
        <>
        </>
    )
}

export default React.memo(BlockImageButton);
