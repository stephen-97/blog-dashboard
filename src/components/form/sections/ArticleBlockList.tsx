import React, {useState} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {update} from "../../../redux/ArticleSlice";
import {Reorder} from "framer-motion";
import ToggleButton from "../../utility/ToggleButton";
import {TToggleButton} from "../../../utils/config";
import BlockReorder from "../blocks/types/BlockReorder";
import BlockListInfo from "../blocks/sections/BlockListInfo";
import BlocksListDefaultContainer from "../blocks/sections/BlockListDefault";

const StyledArticleBlockList = styled.section<{ $reOrderView: boolean }>`

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

    .form-section-container {

          input, textarea {
            color: black !important;
          }

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
            flex-wrap: wrap;
            gap: 2rem;

            .reorder-item {
                flex: 0 0 calc(33.333% - 3rem);
            }
        }
    }
`;

interface ArticleBlockListProps extends React.HTMLProps<HTMLElement> {
    label: string
}

const ArticleBlockList = ({label, ...props}: ArticleBlockListProps) => {

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
        <StyledArticleBlockList {...props} $reOrderView={reOrderView} {...props}>
            <label>{label}</label>
            <section className={'form-section-container'}>
                <div className={'reorder-container-title'}>
                    <label>Mode d'affichage :</label>
                    <ToggleButton buttons={buttonsBlockList}/>
                </div>

                {
                    {
                        'default': <BlocksListDefaultContainer/>,
                        'reorder': <Reorder.Group
                            values={paragraphData}
                            onReorder={e => dispatch(update({article: e}))}
                            axis={"y"}
                            className={`block-list-reorder`}
                        >
                            {paragraphData && paragraphData.map((e, i) => (
                                <BlockReorder i={i} e={e} key={i}/>
                            ))}
                        </Reorder.Group>,
                        'info': <BlockListInfo/>
                    }[blockListView]
                }
            </section>
        </StyledArticleBlockList>
    )
}

export default React.memo(ArticleBlockList);