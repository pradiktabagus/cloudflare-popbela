/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

import type { ArticleProps } from '@/types/article';
import type { IArticleDetail } from '@/types/responses/pages/detail-article';

const ArticleAmp = ({ data }: ArticleProps) => {
  const { listicle = [], description = '<p></p>', url, read_more } = data;
  const router = useRouter();
  const { slug, page } = router.query;
  useEffect(() => {
    const HeadingElement = Array.from(document.querySelectorAll('h3'));
    const PElenent = Array.from(document.querySelectorAll('p'));
    const bacaJugaLinks = [...HeadingElement, ...PElenent];
    const filtered = bacaJugaLinks?.filter((element) =>
      element.innerText.toLowerCase().includes('baca juga')
    );
    filtered.forEach((el) => el.classList.add('auto-baca-juga'));
    return () => {
      filtered.forEach((el) => el.classList.remove('auto-baca-juga'));
    };
  }, [slug]);

  const createElement = (type: string, value: string) => {
    switch (type) {
      case 'p':
        return `<p>${value}</p>`;
      case 'h2':
        return `<h2>${value}</h2>`;
      default:
        return `<h1>${value}</h1>`;
    }
  };

  const altImg = (no_listicle: number) => {
    let alt = 'popbela.com';
    const indexListicle = listicle.find(
      (i) => i.type === 'title' && i.listicle_no === no_listicle
    );
    if (indexListicle) {
      // regex element <i></i>
      const regex =
        /(<([a-z]+)(?![^>]*\/>)[^>]*>)|(<\/([a-z]+)(?![^>]*\/>)[^>]*>)/g;
      alt = indexListicle?.value.replace(regex, ' ');
    }
    return alt;
  };

  const renderSection = (item: IArticleDetail, i: number) => {
    switch (item.type) {
      case 'content':
      case 'ingredients':
      case 'instructions':
      case 'recipe_content':
        return (
          <Fragment key={i}>
            <div
              data-testid={`content-listicle-${item?.listicle_no}`}
              dangerouslySetInnerHTML={{
                __html: item?.value,
              }}
            />
            {item?.ads && (
              <div dangerouslySetInnerHTML={{ __html: item.ads }} />
            )}
          </Fragment>
        );
      case 'title':
      case 'ingredients_title':
      case 'instructions_title':
      case 'recipe':
        return (
          <div
            data-testid={`title-listicle-${item?.listicle_no}`}
            key={i}
            dangerouslySetInnerHTML={{
              __html: createElement(item.value_type, item.value),
            }}
          ></div>
        );
      case 'image':
      case 'ingredients_image':
      case 'instructions_image':
      case 'recipe_image':
        return (
          <div key={i} data-testid={`image-listicle-${item?.listicle_no}`}>
            <amp-img
              src={item.cover?.source_url}
              layout="responsive"
              alt={altImg(item.listicle_no ?? 0)}
              height="25px"
              width="25px"
              className="amp-img-author"
            />
            <span>{item.cover?.source_name}</span>
          </div>
        );
      case 'readmore':
        return (
          <div
            key={i}
            className="baca-juga"
            data-testid="readmore"
            dangerouslySetInnerHTML={{
              __html: item?.value,
            }}
          />
        );
      case 'instagram':
      case 'facebook':
      case 'twitter':
      case 'youtube':
      case 'embedHTML':
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: item?.value }} />
        );
      default:
        return <div key={i} />;
    }
  };

  return (
    <>
      <div className={'amp-article-content-container'}>
        {description ? (
          <div
            className="post-entry"
            data-testid="content"
            dangerouslySetInnerHTML={{
              __html:
                description?.replace?.(/<p>/gi, '<p style="margin:1rem 0;">') ??
                '<></>',
            }}
          ></div>
        ) : (
          listicle?.map((item: IArticleDetail, i: number) => (
            <div
              key={i}
              id={`${
                item.listicle_no === 2 && listicle[i + 1]?.listicle_no === 3
                  ? 'page-2'
                  : ''
              }`}
              className={`${
                !page &&
                item.listicle_no &&
                item.listicle_no > 2 &&
                'amp-listicle hide'
              } amp-listicle-${item.listicle_no}`}
            >
              {renderSection(item, i)}
            </div>
          ))
        )}

        {read_more && (
          <div id="read-more" className="read-more-btn">
            <a href={`${url}?page=all#page-2`} className="btn">
              <span>Baca Artikel Selengkapnya</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.8334 13.8217L15.2442 9.41087C15.4014 9.25908 15.6119 9.17508 15.8304 9.17698C16.0489 9.17888 16.2579 9.26652 16.4124 9.42103C16.5669 9.57553 16.6546 9.78454 16.6565 10.003C16.6584 10.2215 16.5744 10.432 16.4226 10.5892L10.5892 16.4225C10.4928 16.5193 10.374 16.5908 10.2434 16.6309C10.1717 16.6523 10.0974 16.6641 10.0226 16.6659H9.98173C9.90716 16.6641 9.83316 16.6523 9.76173 16.6309C9.63111 16.5908 9.51235 16.5193 9.41589 16.4225L3.58256 10.5892C3.43076 10.432 3.34677 10.2215 3.34866 10.003C3.35056 9.78454 3.4382 9.57553 3.59271 9.42103C3.74722 9.26652 3.95623 9.17888 4.17473 9.17698C4.39322 9.17508 4.60372 9.25908 4.76089 9.41087L9.16673 13.8217V4.16671C9.16673 3.94569 9.25452 3.73373 9.4108 3.57745C9.56708 3.42117 9.77905 3.33337 10.0001 3.33337C10.2211 3.33337 10.433 3.42117 10.5893 3.57745C10.7456 3.73373 10.8334 3.94569 10.8334 4.16671V13.8217Z"
                  fill="#d51c6a"
                />
              </svg>
            </a>
          </div>
        )}
        <style global jsx>{`
          .post-entry,
          .amp-article-content-container {
            line-height: 1.4;
            font-size: 22px;
            color: #4c4c4c;
            font-weight: 500;
          }
          .post-entry a,
          .amp-article-content-container a {
            text-decoration: none;
            color: #d51c6a;
          }
          .post-entry h1,
          .post-entry h2,
          .post-entry h3,
          .post-entry h4,
          .post-entry h5,
          .post-entry h6,
          .post-entry .h1,
          .post-entry .h2,
          .post-entry .h3,
          .post-entry .h4,
          .post-entry .h5,
          .post-entry .h6,
          .amp-article-content-container h1,
          .amp-article-content-container h2,
          .amp-article-content-container h3,
          .amp-article-content-container h4,
          .amp-article-content-container h5,
          .amp-article-content-container h6,
          .amp-article-content-container .h1,
          .amp-article-content-container .h2,
          .amp-article-content-container .h3,
          .amp-article-content-container .h4,
          .amp-article-content-container .h5,
          .amp-article-content-container .h6 {
            font-family: LimerickMedium, sans-serif;
            font-weight: bold;
            font-size: 22px;
            line-height: 1.4;
          }
          .post-entry h2,
          .post-entry h3,
          .post-entry h4,
          .post-entry h5,
          .post-entry p,
          .amp-article-content-container h2,
          .amp-article-content-container h3,
          .amp-article-content-container h4,
          .amp-article-content-container h5,
          .amp-article-content-container p {
            text-align: left;
          }
          .post-entry h1,
          .post-entry .h1,
          .post-entry h2,
          .post-entry .h2,
          .post-entry h3,
          .post-entry .h3,
          .post-entry h4,
          .post-entry .h4,
          .post-entry h5,
          .post-entry .h5,
          .post-entry h6,
          .post-entry .h6,
          .amp-article-content-container h1,
          .amp-article-content-container .h1,
          .amp-article-content-container h2,
          .amp-article-content-container .h2,
          .amp-article-content-container h3,
          .amp-article-content-container .h3,
          .amp-article-content-container h4,
          .amp-article-content-container .h4,
          .amp-article-content-container h5,
          .amp-article-content-container .h5,
          .amp-article-content-container h6,
          .amp-article-content-container .h6 {
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .post-entry small,
          .post-entry .small,
          .amp-article-content-container small,
          .amp-article-content-container .small {
            font-size: 75%;
          }
          .post-entry ul,
          .post-entry ol,
          .amp-article-content-container ul,
          .amp-article-content-container ol {
            margin-left: 0;
            padding-left: 15px;
          }
          .post-entry ul,
          .posamp-article-content-container ul {
            padding-left: 20px;
          }
          .post-entry .embed-image img,
          .amp-article-content-container .embed-image img {
            width: 100%;
          }
          .inarticle {
            text-align: center;
            position: relative;
            overflow: hidden;
            padding: 0;
            margin: 0;
          }
          .inarticle > * {
            margin: 0 auto 2rem auto;
          }
          .amp-listicle {
            display: none;
          }
          .amp-listicle-1 {
            display: block;
          }
          .amp-listicle-2.hide,
          .amp-listicle-2.hide:after {
            display: block;
            height: 256px;
          }
          .amp-listicle-2.hide {
            overflow: hidden;
            position: relative;
          }
          .amp-listicle-2.hide:after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            background: linear-gradient(180deg, #fff0, #fff 80%);
          }
          .baca-juga a {
            text-decoration: none;
            color: #d51c6a;
            font-size: 22px;
          }
          .read-more-btn {
            display: block;
            position: relative;
            width: 100%;
            margin-bottom: 40px;
          }
          .read-more-btn a {
            text-decoration: none;
            border: transparent;
            -o-border-radius: 4px;
            fon8-weight: 700;
            background-color: rgb(213 28 106 / 21%);
            color: #d51c6a;
            font-size: 18px;
            padding: 8px 16px;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            -ms-border-radius: 4px;
            border-radius: 4px;
            gap: 8px;
            width: min-content;
            min-width: 350px;
          }
        `}</style>
      </div>
    </>
  );
};
export default ArticleAmp;
