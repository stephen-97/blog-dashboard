import React, {useState} from "react";
import styled from "styled-components";
import {useAppSelector} from "../../../redux/store";
import TextImagesBlock from "../types/TextImagesBlock";
import AddBlockView from "../extra/AddBlockView";
import ImagesBlock from "../types/ImagesBlock";

const StyledBlockListDefaultContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35rem, 0.5fr));
    grid-gap: 2rem;
    margin-bottom: 2rem;
    @media (max-width: 1470px)  {
        grid-template-columns: 1fr;
    }
    .block {
        display: flex;
        height: 40rem;
        padding: 1rem;
        flex-direction: column;
        background-color: var(--white);
        border-radius: var(--border-radius);
        gap: 1rem;

    }
`;


const StyledButtonAddBlock = styled.button`
    padding: 1rem 2rem;
    background-color:#38404e;
    //border: 2px solid var(--white);
    border-radius: var(--border-radius);
    font-size: 1.125rem;
    color: var(--white);
`;

interface BlockListContainerProps extends React.HTMLProps<HTMLElement> {
}

const BlocksListDefaultContainer = ({label, ...props}: BlockListContainerProps) => {

    const paragraphData = useAppSelector((state) => state.article)

    const [openAddBlockView, setOpenAddBlockView] = useState<boolean>(false)


    return (
        <>
            <StyledBlockListDefaultContainer>
                {paragraphData && paragraphData.map((e, i) => (
                    <React.Fragment key={i}>
                        {
                            {
                                'TextImages': <TextImagesBlock i={i} e={e} className={'block'}/>,
                                'MultipleImages': <ImagesBlock i={i} e={e} className={'block'}/>,
                            }[e.type]
                        }
                    </React.Fragment>
                ))}
            </StyledBlockListDefaultContainer>
            <StyledButtonAddBlock onClick={() => setOpenAddBlockView(true)}>Ajouter un block</StyledButtonAddBlock>
            {openAddBlockView && <AddBlockView openViewState={{state: openAddBlockView, set: setOpenAddBlockView}}/>}
        </>
    )
}

export default React.memo(BlocksListDefaultContainer);
