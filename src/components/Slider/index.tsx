import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box } from '@chakra-ui/layout';
import type { LayoutProps, SpaceProps } from '@chakra-ui/styled-system';
import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import type { ResponsiveObject, Settings } from 'react-slick';
import Slider from 'react-slick';

import classes from './Slider.module.scss';

const arrowBeforeStyle = {
  fontSize: 26.5,
  color: 'black',
  opacity: 0.5,
  _hover: { opacity: 0.9 },
};

const PrevArrow = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      style={{ ...style, left: -45 }}
      onClick={onClick}
      _before={arrowBeforeStyle}
    />
  );
};
const NextArrow = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      style={{ ...style, right: -45 }}
      onClick={onClick}
      _before={arrowBeforeStyle}
    />
  );
};

const defaultResponsive: ResponsiveObject[] = [
  {
    breakpoint: 960,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 560,
    settings: {
      slidesToShow: 1,
    },
  },
];

export type CustomSLiderProps = Settings & {
  boxProps?: LayoutProps & SpaceProps;
  withMargin?: boolean;
  withDefaultResponsive?: boolean;
};

export const CustomSlider = (props: CustomSLiderProps) => {
  const {
    dots,
    infinite = true,
    speed = 500,
    slidesToShow = 1,
    slidesToScroll = 1,
    autoplaySpeed = 3000,
    boxProps,
    withMargin,
    withDefaultResponsive,
    responsive,
  } = props;
  return (
    <Box w="full" {...boxProps} data-testid="slider">
      <Slider
        dots={dots}
        infinite={infinite}
        speed={speed}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        autoplaySpeed={autoplaySpeed}
        arrows={false}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        responsive={
          withDefaultResponsive
            ? [...defaultResponsive, ...(responsive ?? [])]
            : responsive
        }
        {...props}
        className={clsx(
          classes['popbela-slider'],
          withMargin && classes['with-margin']
        )}
      >
        {props.children}
      </Slider>
    </Box>
  );
};
