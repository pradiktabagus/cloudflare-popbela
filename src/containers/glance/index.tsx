import { useIsFetching } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { SectionArticleGlanceProps } from './SectionArticle';

const SectionArticle = dynamic<SectionArticleGlanceProps>(
  () => import('./SectionArticle')
);
const Glance = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { category, subCategory, author, slug, utm_medium } = router.query;
  // pakai lazy initialization, biar gak ganti"
  const [initialFullUrl] = useState(() => router.asPath);
  const [initialOem] = useState(utm_medium);
  const [initialUrl] = useState(
    () =>
      `timeline/${category}/${subCategory}/${author}/${slug}?key=${process.env.glanceKey}`
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

  const getDeviceType = useMemo(():
    | 'xiaomi_lp'
    | 'Realme'
    | 'RealmeGO'
    | 'RealmeAOSP'
    | 'ca-pub-3859189003926819-tag'
    | 'Oppo_v2' => {
    switch (utm_medium) {
      case 'x':
        return 'xiaomi_lp';
      case 'r':
        return 'Realme';
      case 'go':
        return 'RealmeGO';
      case 'aosp':
        return 'RealmeAOSP';
      case 'o2':
        return 'Oppo_v2';
      case 'v':
        return 'ca-pub-3859189003926819-tag';
      default:
        return 'xiaomi_lp';
    }
  }, [utm_medium]);

  const onEmptyData = useCallback(() => setHasNextPage(false), []);

  return (
    <>
      <Head>
        <script
          id="sticky-ads"
          dangerouslySetInnerHTML={{
            __html: `
            window.googletag = window.googletag || {cmd: []};
            var gptadslots = [];
            var SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30;
            
            googletag.cmd.push(function() {
                var REFRESH_KEY = 'refresh';
                var REFRESH_VALUE = 'true';
                googletag.defineSlot('/${process.env.NEXT_PUBLIC_DFP_NETWORK_ID_GLANCE}/${getDeviceType}/popbela_footer_sticky', [[320, 50],[300, 50]], 'div-gpt-ad-5').setTargeting(REFRESH_KEY, REFRESH_VALUE).setTargeting('pos', ['footer_sticky']).addService(googletag.pubads());
                googletag.pubads().addEventListener('impressionViewable', function(event) {
                    var slot = event.slot;
                    if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
                        setTimeout(function() {
                            googletag.pubads().refresh([slot]);
                        }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
                    }
                });
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
            });`,
          }}
        />
      </Head>
      <div id="article-page" className="glance-articles">
        <SectionArticle
          type={{
            param_oem: initialOem,
            oem: getDeviceType,
          }}
          previousUrl={initialFullUrl}
          apiUrl={initialUrl}
        />
        {pageNumbers.map((n) => (
          <SectionArticle
            type={{
              param_oem: utm_medium,
              oem: getDeviceType,
            }}
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
        <div
          id="div-gpt-ad-5"
          className="fixed inset-x-0 bottom-0 z-10 flex w-full justify-center text-center"
        >
          <Script
            id="ads-5"
            async
            dangerouslySetInnerHTML={{
              __html: `googletag.cmd.push(function() { googletag.display('div-gpt-ad-5'); });`,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Glance;
