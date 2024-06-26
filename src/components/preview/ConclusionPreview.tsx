import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../../redux/store";
import {GoSmiley} from "react-icons/go";
import { PiSmileyAngry } from "react-icons/pi";

const StyledConclusionPreview = styled.div`
  .conclusion-container {
    box-shadow: var(--box-shadow-m);
    border-radius: var(--border-radius-s);
    background-color: whitesmoke;
    padding: 1rem;

    h3 {
      text-transform: uppercase;
      color: lightseagreen;
    }

    p {
      margin-bottom: 2rem;
    }

    .question {
      display: block;
      font-size: var(--fs-m);
      margin-bottom: var(--margin-l);
    }

    .plus-and-more {
      display: flex;
      gap: 1rem;
      @media only screen and (max-width: 768px) {
        flex-direction: column;
      }

      .plus-and-more-block {
        padding: 1rem;
        flex: 1;
        border-radius: var(--border-radius-s);
        background-color: var(--five);
        .title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          h4 {
            text-transform: uppercase;
          }
        }
        ul {
          display: flex;
          flex-direction: column;
          list-style: initial;
          li {
            margin-left: 1.5rem;
            list-style: outside;
            line-height: 25px;
          }
        }
        &.more-block {
          background-color: var(--six);
        }
      }
    }
  }
`

interface ConclusionPreviewProps extends React.HTMLProps<HTMLDivElement> {

}

const ConclusionPreview = (props: ConclusionPreviewProps) => {

    const articleGameConclusion = useAppSelector((state) => state.articleConclusion)

    return (
        <StyledConclusionPreview {...props}>
            <div className={'conclusion-container'}>
                <h3>Conclusion</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu ante sit amet odio maximus lobortis.
                    Suspendisse vulputate sem massa, sed suscipit mauris finibus quis. Proin vehicula nibh lectus, sed cursus odio efficitur id.
                    Vivamus ac mauris tempor, tincidunt ex at, malesuada dui. Nulla rutrum ipsum turpis, non vehicula sem interdum egestas.
                    Etiam vitae dui massa.
                </p>
                <strong className={'question'}>{props.title}</strong>
                <div className={'plus-and-more'}>
                    <div className={'plus-and-more-block plus-block'}>
                        <div className={'title'}>
                            <GoSmiley size={40}/>
                            <h4>Oui</h4>
                        </div>
                        <ul>
                            {articleGameConclusion.conclusionGoodPoints.map((e, i) =>
                                <li key={i}>{e}</li>
                            )}
                        </ul>
                    </div>
                    <div className={'plus-and-more-block more-block'}>
                        <div className={'title'}>
                            <PiSmileyAngry size={40}/>
                            <h4>Mais...</h4>
                        </div>
                        <ul>
                            {articleGameConclusion.conclusionBadPoints.map((e, i) =>
                                <li key={i}>{e}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </StyledConclusionPreview>
    );
}

export default React.memo(ConclusionPreview);