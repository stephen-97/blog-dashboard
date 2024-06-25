import React from 'react';
import styled from "styled-components";

const StyledConclusionPreview = styled.div`

`

interface ConclusionPreviewProps extends React.HTMLProps<HTMLDivElement> {

}

const ConclusionPreview = (props: ConclusionPreviewProps) => {

    return (
        <StyledConclusionPreview {...props}>
        </StyledConclusionPreview>
    );
}

export default React.memo(ConclusionPreview);