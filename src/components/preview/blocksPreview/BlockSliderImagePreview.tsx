import React from 'react';
import styled from "styled-components";
import {TArticleMultipleImages} from "../../../utils/config";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";


const StyledBlockSliderImage = styled.div`
    position: relative;
    max-width: min(1000px, 100%);
    margin-bottom: var( --margin-l);

    .swiper-container {
        padding: 0 1rem;
        overflow: hidden;
        .swiper {
            width: 100%;
            height: 100%;
            border-radius: var(--radius-m);
            .swiper-wrapper {
                //max-height: 30rem;
                position: relative;
                .swiper-slide {
                    height: 100%;
                    overflow: hidden;
                    &:first-of-type{
                        border-top-left-radius: var(--radius-m);
                        border-bottom-left-radius: var(--radius-m);
                    }
                    &:last-of-type{
                        border-top-right-radius: var(--radius-m);
                        border-bottom-right-radius: var(--radius-m);
                    }
                }
            }
            .swiper-pagination {
                display: flex;
                background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);;
                padding: 2rem 1rem 0.8rem 1rem;
                bottom: 0;
                gap: 0.5rem;
                .swiper-pagination-bullet {
                    flex: 1;
                    border-radius: var(--radius-m);
                    background-color: whitesmoke;
                    opacity: 0.7;
                    &.swiper-pagination-bullet-active {
                        opacity: 1;
                        background-color: lightseagreen;
                    }
                }
            }
        }

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
            <div className={'swiper-container'}>
                <Swiper
                    pagination={{clickable: true}}
                    slidesPerView={1}
                    onSlideChange={() => null}
                    onSwiper={(swiper: any) => null}
                    className={'mySwiper'}
                    modules={[Pagination, Navigation, Scrollbar, A11y]}
                    navigation={true}
                >
                    {blockElem.images.map((e, i) =>
                        <SwiperSlide key={i}>
                            <img src={e} alt={''}/>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </StyledBlockSliderImage>
    );
}

export default React.memo(BlockSliderImagePreview);