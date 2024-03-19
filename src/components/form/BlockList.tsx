import React, {useState} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import { update} from "../../redux/ArticleSlice";
import {Reorder} from "framer-motion";
import BlockReorder from "./BlockReorder";
import ToggleButton2 from "../utility/ToggleButton2";
import {TToggleButton} from "../../utils/config";
import BlockDefault from "./BlockDefault";


const StyledBlockList = styled.section<{$reOrderView: boolean}>`

  .paragraph-plus-images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35rem, 0.5fr));
    grid-gap: 2rem;
  }

  .toggle-button-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1rem;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .list-container {
    background-color: #282c34;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    .reorder-container-title {
      padding: 1rem 0;
      margin-bottom: 1rem;
      label {
        color: var(--white);
        font-size: var(--xlarge);
      }
      img, svg {
        height: 50px;
        width: 50px;
        color: white;
      }
    }
    .block-list-reorder {
      display: flex !important;
      flex-direction: row !important;
      padding: 1rem;
      flex-wrap: wrap;
      gap: 2rem;
    }
  }
  
  > label {
    display: flex;
    gap: 0.4rem;
    button {
      transition: 0.2s ease-in-out;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

interface StyledBlockListProps extends React.HTMLProps<HTMLElement> {
    label: string
}

const BlockList = ({label,...rest}: StyledBlockListProps) => {

    const paragraphData = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    const [reOrderView, setReOrderView] = useState(false);



    type TBlockListView = 'default' | 'reorder' | 'info';

    const [blockListView, setBlockListView] = useState<TBlockListView>('default');


    const buttonsBlockList: TToggleButton[] = [
        {title: "Défaut", callBack: () => setBlockListView('default')},
        {title: "Réorganisation", callBack: () => setBlockListView('reorder')},
        {title: "Détail", callBack: () => setBlockListView('info')},
    ]

    return (
        <StyledBlockList $reOrderView={reOrderView}>
            <label>{label}</label>
            <div className={'list-container'}>
                <div className={'reorder-container-title'}>
                    <label>Mode d'affichage :</label>
                    <ToggleButton2 buttons={buttonsBlockList} />
                </div>
                {
                    {
                        'default': <ul className={`paragraph-plus-images`}>
                                        {paragraphData && paragraphData.map((e, i) => (
                                            <BlockDefault i={i} e={e} />
                                        ))}
                                    </ul>,
                        'reorder': <Reorder.Group
                                        values={paragraphData}
                                        onReorder={e => dispatch(update({article: e}))}
                                        axis={"y"}
                                        className={`paragraph-plus-images block-list-reorder`}
                                    >
                                        {paragraphData && paragraphData.map((e, i) => (
                                            <BlockReorder i={i} e={e} />
                                        ))}
                                    </Reorder.Group>,
                        'info': <div>Info</div>
                    }[blockListView]
                }
            </div>
        </StyledBlockList>
    )
}

export default BlockList;


/**
 * <Reorder.Group
 *                         values={paragraphData}
 *                         onReorder={reOrder}
 *                         axis={"y"}
 *                         className={`paragraph-plus-images ${reOrderView ? 'block-list-reorder' : ''}`}
 *                     >
 *                         {paragraphData && paragraphData.map((e, i) => (
 *                             <BlockReorder i={i} e={e} reOrderView={reOrderView}  key={e.index}/>
 *                         ))}
 *                     </Reorder.Group>
 *
 * {reOrderView && <div className={'reorder-container-title'}>
 *                     <img src={DragNDrop} alt={"drag n drop icon"}/>
 *                 </div>}
 */