import React from 'react';
import styled from "styled-components";
import {TArticleMultipleImages} from "../../../utils/config";


const StyledBlockSliderImage = styled.div`
   
`

interface BlockSliderImagePreviewProps extends React.HTMLProps<HTMLDivElement> {
    blockElem: TArticleMultipleImages,
    i: number,
}


const BlockSliderImagePreview = ({i, blockElem}: BlockSliderImagePreviewProps) => {

    return (
        <StyledBlockSliderImage key={i}>
            <div>Test</div>
        </StyledBlockSliderImage>
    );
}

export default React.memo(BlockSliderImagePreview);