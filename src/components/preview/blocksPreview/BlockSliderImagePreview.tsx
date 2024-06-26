import React from 'react';
import styled from "styled-components";
import {TArticleMultipleImages} from "../../../utils/config";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import "swiper/css"
import 'swiper/css/pagination';

const StyledBlockSliderImage = styled.div`
  position: relative;
  margin-bottom: var(--margin-l);

  .swiper-container {
    
    

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

interface BlockSliderImagePreviewProps extends React.HTMLProps<HTMLDivElement> {
    blockElem: TArticleMultipleImages,
    i: number,
}


const BlockSliderImagePreview = ({i, blockElem, ...props}: BlockSliderImagePreviewProps) => {

    return (
        <StyledBlockSliderImage key={i} {...props}>
            <h4>{blockElem.title}</h4>
            <div className={'swiper-container'}>
                <Swiper
                    pagination={{clickable: true}}
                    slidesPerView={1}
                    onSlideChange={() => null}
                    onSwiper={(swiper: any) => null}
                    fadeEffect={ // Add this
                        {crossFade: true,}
                    }
                    className={'mySwiper'}
                    modules={[Pagination, Navigation, Scrollbar, A11y]}
                    navigation={true}
                >
                    {blockElem.images.map((e, index) =>
                        <SwiperSlide key={index}>
                            <img src={e} alt={''}/>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </StyledBlockSliderImage>
    );
}

export default React.memo(BlockSliderImagePreview);