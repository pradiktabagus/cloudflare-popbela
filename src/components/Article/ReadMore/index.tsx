import { useRouter } from 'next/router';
import { useEffect } from 'react';

import syles from '../article-detail.module.scss';

export type TReadMore = {
  variant?: 'article' | 'horoscope' | 'glance' | 'quiz';
};
const Index = ({ variant }: TReadMore) => {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;
  const handleReadMore = () => {
    router.push(
      {
        pathname: router?.asPath,
        query: {
          page: 'all',
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
    const splitPage = Array.from(
      document?.getElementsByClassName('split-page')
    );
    splitPage?.forEach((el) => el.classList.add('open'));
    document.getElementById('read-more')?.classList.remove('show');
    document.getElementById('read-more')?.classList.add('hide');
  };

  useEffect(() => {
    const splitPage = Array.from(
      document?.getElementsByClassName('split-page')
    );
    if (splitPage.length === 0 && variant !== 'quiz') {
      document.getElementById('read-more')?.classList.remove('show');
      document.getElementById('read-more')?.classList.add('hide');
    } else if (query.page === 'all') {
      splitPage?.forEach((el) => el.classList.add('open'));
      document.getElementById('read-more')?.classList.remove('show');
      document.getElementById('read-more')?.classList.add('hide');
    } else {
      splitPage?.forEach((el, i) => i > 0 && el.classList.remove('open'));
      document.getElementById('read-more')?.classList.remove('hide');
      document.getElementById('read-more')?.classList.add('show');
    }

    return () => {
      splitPage?.forEach((el, i) => i > 0 && el.classList.remove('open'));
      document.getElementById('read-more')?.classList.remove('hide');
      document.getElementById('read-more')?.classList.add('show');
    };
  }, [query.page, slug, variant]);

  return (
    <div id="read-more" className={syles['read-more-btn']}>
      <button
        id="btn_read-more"
        className="btn"
        onClick={handleReadMore}
        type="button"
      >
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
      </button>
    </div>
  );
};
export default Index;
