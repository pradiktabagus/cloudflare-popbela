import { Box, Grid } from '@chakra-ui/layout';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useRef } from 'react';

import { useDefaultComponent } from '@/adapters/hooks/components';
import type { LinkProps } from '@/types/customLink';
import type {
  ITrendingTags,
  ResponseTrendingTags,
} from '@/types/responses/components/trending-tags';

import styles from './index.module.scss';

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const TrendingTag = ({ isMobile = false }: { isMobile?: boolean }) => {
  const refTrendingTags = useRef<HTMLDivElement>(null);
  const refScroll = useRef<HTMLDivElement>(null);
  const { data } = useDefaultComponent<ResponseTrendingTags>({
    end_point: '/trending-tags',
  });
  const trendingTags = data?.data || [];
  useEffect(() => {
    if (refTrendingTags.current && refScroll.current) {
      const scrollWidth = refTrendingTags.current?.scrollWidth || 0;
      const clientlWidth = refTrendingTags.current?.clientWidth || 0;
      const hasHorizontalScrollbar = scrollWidth > clientlWidth;
      refScroll.current!.style.display = hasHorizontalScrollbar
        ? 'flex'
        : 'none';
    }
  }, [refTrendingTags]);

  const btnScrollLeft = () => {
    if (refTrendingTags.current) {
      refTrendingTags.current!.scrollLeft -= 200;
      refTrendingTags.current.animate(
        { scrollLeft: (refTrendingTags.current!.scrollLeft -= 200) },
        600
      );
    }
  };
  const btnScrollRight = () => {
    if (refTrendingTags.current) {
      refTrendingTags.current!.scrollLeft += 200;
      refTrendingTags.current.animate(
        { scrollLeft: (refTrendingTags.current!.scrollLeft += 200) },
        600
      );
    }
  };
  return (
    <Grid
      as="nav"
      templateColumns="auto 1fr auto"
      paddingTop="8px"
      paddingBottom="8px"
      fontFamily="limerick"
      alignItems="center"
      gap="8px"
      marginLeft={isMobile ? '-7px' : 0}
      paddingLeft={isMobile ? '22px' : 0}
      paddingRight={isMobile ? '7px' : 0}
      data-testid="section-trending-tag"
    >
      <Box
        fontSize="16px"
        bg="#800f3c"
        color="white"
        padding="8px 10px"
        borderRadius="5px 0 0 5px"
        fontWeight="700"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="40px"
        minW="125px"
      >
        Trending Topic
      </Box>
      <Fragment>
        <div
          className={styles.wrapper__trending_tag}
          id="trending_tags"
          ref={refTrendingTags}
          data-testid="trending-tags"
        >
          <ul className="flex flex-row">
            {trendingTags
              ?.sort((a, b) => a.order_num - b.order_num)
              .map((item: ITrendingTags) => (
                <li key={item.order_num} data-testid="item-trending-tag">
                  <CustomLink className={styles.tags} href={item.url}>
                    {item.tag?.name}
                  </CustomLink>
                </li>
              ))}
          </ul>
        </div>
        {!isMobile && (
          <Box
            display="flex"
            gap="8px"
            ref={refScroll}
            data-testid="btn-scroll"
          >
            <Box
              onClick={btnScrollLeft}
              type="button"
              boxSize="24px"
              icon={faArrowCircleLeft}
              as={FontAwesomeIcon}
              color="#800f3c"
              cursor="pointer"
            />
            <Box
              onClick={btnScrollRight}
              boxSize="24px"
              icon={faArrowCircleRight}
              as={FontAwesomeIcon}
              color="#800f3c"
              cursor="pointer"
            />
          </Box>
        )}
      </Fragment>
    </Grid>
  );
};
export default TrendingTag;
