import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../../redux/store";

const StyledConclusionPreview = styled.div`

`

interface ConclusionPreviewProps extends React.HTMLProps<HTMLDivElement> {

}

const ConclusionPreview = (props: ConclusionPreviewProps) => {

    const articleGameConclusion = useAppSelector((state) => state.articleConclusion)

    return (
        <StyledConclusionPreview {...props}>
            <p>{articleGameConclusion.conclusionText}</p>
        </StyledConclusionPreview>
    );
}

export default React.memo(ConclusionPreview);