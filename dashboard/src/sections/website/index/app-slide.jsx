/* eslint-disable import/no-extraneous-dependencies */
import 'swiper/css';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Swiper, SwiperSlide } from 'swiper/react';

const SlideHome = ({ view }) => (
  <Swiper
    spaceBetween={50}
    slidesPerView={view || 1}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>
      <img src="/assets/slider/slide1.png" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/assets/slider/slide3.png" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/assets/slider/slide2.png" alt="" />
    </SwiperSlide>
  </Swiper>
);
SlideHome.protoType = {
  view: PropTypes.number,
};
export default SlideHome;
