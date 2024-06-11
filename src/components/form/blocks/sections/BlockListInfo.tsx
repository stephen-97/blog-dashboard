import React, {} from "react";
import styled from "styled-components";
import { useAppSelector} from "../../../../redux/store";

const StyledBlockListinfo = styled.div`
  .section {
    margin-bottom: 1rem;
    .legend {
      color: var(--white);
      font-weight: bolder;
      font-size: 1.1rem;
      margin-right: 0.5rem;
    } 
    .response {
      color: darkgray;
      font-size: 1.1rem;
    }
  }
`;

const BlockListInfo = () => {

    const paragraphData = useAppSelector((state) => state.article)

    return (
        <StyledBlockListinfo>
            <div className={'section'}>
                <span className={'legend'}>Nombre de blocs : </span>
                <span className={'response'}>{paragraphData.length}</span>
            </div>
            <div className={'section'}>
                <span className={'legend'}>Nombre d'images : </span>
                <span className={'response'}>{paragraphData.length}</span>
            </div>
            <div className={'section'}>
                <span className={'legend'}>Poids totale: </span>
                <span className={'response'}>{paragraphData.length}</span>
            </div>
        </StyledBlockListinfo>
    )
}

export default React.memo(BlockListInfo);