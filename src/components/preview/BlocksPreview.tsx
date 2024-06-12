import React from 'react';
import styled from "styled-components";
import {TArticleContent, TArticleMultipleImages, TArticleTextImage} from "../../utils/config";
import BlockTextImagePreview from "./blocksPreview/BlockTextImagePreview";
import BlockSliderImagePreview from "./blocksPreview/BlockSliderImagePreview";

const StyledBlocksPreview = styled.div`

`
interface IntroArticleProps extends React.HTMLProps<HTMLDivElement> {
    blockData: TArticleContent[]
}


const BlocksPreview = ({blockData}: IntroArticleProps) => {

    const renderBlock = (i: number,e: TArticleContent) => {
        if(e.type === 'TextImages') {
            return <BlockTextImagePreview blockElem={e as TArticleTextImage} i={i} />
        }
        if(e.type === 'MultiplesImages') {
            return <BlockSliderImagePreview blockElem={e as TArticleMultipleImages} i={i} />
        }
    }

    return (
        <StyledBlocksPreview>
            {blockData.map((e, i) => renderBlock(i, e))}
        </StyledBlocksPreview>
    );
}

export default React.memo(BlocksPreview);