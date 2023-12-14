import { useIsFetching } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { SectionArticleKaikaiProps } from './SectionArticleKaikai';

const SectionArticle = dynamic<SectionArticleKaikaiProps>(
  () => import('./SectionArticleKaikai')
);
const AdsKaikaiSticky = dynamic(() => import('@/components/Ads/Kaikai'));
const Kaikai = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { category, subCategory, author, slug } = router.query;
  // pakai lazy initialization, biar gak ganti"
  const [initialFullUrl] = useState(() => router.asPath);
  const [initialUrl] = useState(
    () =>
      `external/article/${category}/${subCategory}/${author}/${slug}?api_user=kaikainow&tags[]=kaikai-now&key=${process.env.kaikaiKey}`
  );

  const isFetching = useIsFetching();

  const lastPage = useRef(1);
  const [pageNumbers, setPageNumbers] = useState<Array<number>>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { ref: endPageRef } = useInView({
    onChange: (inView) => {
      if (inView && !isFetching && hasNextPage) {
        lastPage.current += 1;
        const pages = Array.from(
          { length: lastPage.current },
          (_, i) => i + 1
        ).filter((n) => n > 1);
        setPageNumbers(pages);
      }
    },
  });

  const onEmptyData = useCallback(() => setHasNextPage(false), []);

  return (
    <Fragment>
      <div id="article-page" className="kaikai-articles">
        <SectionArticle previousUrl={initialFullUrl} apiUrl={initialUrl} />
        {pageNumbers.map((n) => (
          <SectionArticle
            key={n}
            apiUrl={`${initialUrl}&page=${n}`}
            onEmpty={onEmptyData}
          />
        ))}
        {hasNextPage ? (
          <div id="end-page" ref={endPageRef} className="h-1" />
        ) : (
          ''
        )}
        <AdsKaikaiSticky
          className="fixed inset-x-0 bottom-0 z-10 flex w-full justify-center text-center"
          id="div-gpt-ad-sticky"
          adUnit="/ContentGenerator/KaikaiPopbela"
          size={[[320, 50]]}
        />
      </div>
    </Fragment>
  );
};
export default Kaikai;
