/* eslint-disable @typescript-eslint/naming-convention */
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import type { ArticleProps } from '@/types/article';
import clsxm from '@/utils/clsxm';

import type { TQuizArticle } from './Quiz';

const Embed = dynamic(() => import('./Embed'));
const ReadMore = dynamic(() => import('./ReadMore'));
const Yummy = dynamic(() => import('./Yummy'));
const Quiz = dynamic<TQuizArticle>(() => import('./Quiz'));
export const Article = (props: ArticleProps) => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;
  const { data, variant = 'article', oem, body } = props;
  const { description = '<p></p>', sub_category } = data;
  const customClass = useMemo((): any => {
    switch (variant) {
      case 'article':
        return 'article-content';
      case 'horoscope':
        return 'horoscope-content';
      case 'glance':
        return 'glance-content';
      default:
        return 'article-content';
    }
  }, [variant]);

  useEffect(() => {
    const HeadingElement = Array.from(document.querySelectorAll('h3'));
    const PElenent = Array.from(document.querySelectorAll('p'));
    const bacaJugaLinks = [...HeadingElement, ...PElenent];
    const filtered = bacaJugaLinks?.filter((element) =>
      element.innerText?.toLowerCase().includes('baca juga')
    );
    filtered.forEach((el) =>
      el.classList.add(
        `auto-baca-juga`,
        variant === 'glance' ? 'hidden' : 'block'
      )
    );
    return () => {
      filtered.forEach((el) =>
        el.classList.remove(
          'auto-baca-juga',
          variant === 'glance' ? 'hidden' : 'block'
        )
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <>
      {variant === 'glance' && (
        <Head>
          <script
            id="section-ads"
            dangerouslySetInnerHTML={{
              __html: `
                  window.googletag = window.googletag || {cmd: []};

                  googletag.cmd.push(function() {
                      var REFRESH_KEY = 'refresh';
                      var REFRESH_VALUE = 'true';
                      //define penamaan slot untuk random ID
                      var randNumber = Math.floor((Math.random() * 10000000) + 1);
                      var ads_3 = "div-gpt-ad-3-"+randNumber;

                      //override nama div menjadi Random ID
                      document.getElementById("div-gpt-ad-3").id = ads_3;

                      gptadslots['popbela_mrec_mid'] = googletag.defineSlot('/${process.env.NEXT_PUBLIC_DFP_NETWORK_ID_GLANCE}/${oem}/popbela_mrec_mid', [[300, 250],[336,280],"fluid"], ads_3).setTargeting(REFRESH_KEY, REFRESH_VALUE).setTargeting('pos', ['mrec_mid']).addService(googletag.pubads());
                      googletag.display(ads_3);
                      googletag.pubads().refresh([gptadslots['popbela_mrec_mid']]);
                      googletag.pubads().disableInitialLoad();
                      googletag.pubads().enableSingleRequest();
                      googletag.pubads().collapseEmptyDivs();
                      googletag.enableServices();
                  });

                  googletag.cmd.push(function() {
                      var REFRESH_KEY = 'refresh';
                      var REFRESH_VALUE = 'true';
                      //define penamaan slot untuk random ID
                      var randNumber = Math.floor((Math.random() * 10000000) + 1);
                      var ads_4 = "div-gpt-ad-4-"+randNumber;

                      //override nama div menjadi Random ID
                      document.getElementById("div-gpt-ad-4").id = ads_4;

                      gptadslots['popbela_mrec_bottom'] = googletag.defineSlot('/${process.env.NEXT_PUBLIC_DFP_NETWORK_ID_GLANCE}/${oem}/popbela_mrec_bottom', [[300, 250],[336,280],"fluid"], ads_4).setTargeting(REFRESH_KEY, REFRESH_VALUE).setTargeting('pos', ['mrec_bottom']).addService(googletag.pubads());
                      googletag.display(ads_4);
                      googletag.pubads().refresh([gptadslots['popbela_mrec_bottom']]);
                      googletag.pubads().disableInitialLoad();
                      googletag.pubads().enableSingleRequest();
                      googletag.pubads().collapseEmptyDivs();
                      googletag.enableServices();
                  });
                `,
            }}
          />
        </Head>
      )}
      <div
        id="article-content"
        data-testid="article-content"
        className={clsxm('mt-0 mb-20 w-full', customClass, props.classNames)}
      >
        <div
          data-testid="content"
          dangerouslySetInnerHTML={{
            __html: description ?? '<></>',
          }}
        />
        {variant === 'quiz' && (
          <Quiz
            title={data.title ?? ''}
            excerpt={data.excerpt ?? ''}
            article_url={data.url ?? ''}
            type={body?.type}
            data={body?.data}
          />
        )}
        {sub_category?.name === 'food' && <Yummy />}
        {variant === 'article' && <ReadMore />}
        <Embed description={description ?? '<></>'} />
      </div>
    </>
  );
};
