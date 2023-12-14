/* eslint-disable @typescript-eslint/naming-convention */
import { DateDefault } from '@/components/Date';
import type { CardLandscapeProps } from '@/types/card';

export function CardLandscapeAmp(props: CardLandscapeProps): JSX.Element {
  const {
    data,
    titlecolor = '#000',
    widthimg = 130,
    heightimg = 135,
    isLeftTag = false,
    leftTagSrc,
    newBlank,
    type = 'author',
  } = props;
  const { article_url_amp, release_date, author, title, sub_category, cover } =
    data;
  return (
    <div className="card-landscape-amp" data-testid="card-landscape-amp">
      <div className="flex-card">
        <a
          href={article_url_amp}
          target={newBlank ? '_blank' : '_self'}
          className="thumbnail-article"
        >
          <div data-testid="card-image-container-amp" className="box-cover-amp">
            <amp-img
              src={cover?.source_url}
              alt={title}
              height={heightimg}
              width={widthimg}
              object-fit="cover"
            />
            {isLeftTag && (
              <div className="left-tag">
                <amp-img
                  data-testid="logo-publisher"
                  src={leftTagSrc}
                  alt={title}
                  height={'24px'}
                  width={'72px'}
                  object-fit="scale-down"
                />
              </div>
            )}
          </div>
        </a>
        <div
          className="description-container-amp"
          data-testid="description-container-amp"
        >
          <div>
            <a
              href={sub_category?.category_url}
              target={newBlank ? '_blank' : '_self'}
            >
              <p
                className="sub-category-article"
                data-testid="sub-category-amp"
              >
                {sub_category?.name}
              </p>
            </a>
          </div>
          <h3 className="heading-title-article" data-testid="title-amp">
            <a
              href={article_url_amp}
              className="title-article"
              target={newBlank ? '_blank' : '_self'}
            >
              {title}
            </a>
          </h3>
          <div className="footer-card-landscape">
            <a
              data-testid="author-article"
              className="author-article"
              href={
                type === 'cross-publisher'
                  ? author?.author_url
                  : `/author${author?.author_url}`
              }
              target={newBlank ? '_blank' : '_self'}
            >
              {author?.name}
            </a>
            <div className="time-article" data-testid="time">
              <DateDefault date={release_date} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        a {
          text-decoration: none;
        }
        .card-landscape-amp {
          background-color: transparent;
        }
        .flex-card {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
        }
        .box-cover-amp {
          position: relative;
        }
        .left-tag {
          position: absolute;
          top: 0;
          left: 0;
          background: white;
          border-bottom-right-radius: 4px;
        }
        .description-container-amp {
          padding: 10px;
          -webkit-align-items: flex-start;
          -webkit-box-align: flex-start;
          -ms-flex-align: flex-start;
          align-items: flex-start;
          -webkit-align-self: center;
          -ms-flex-item-align: center;
          align-self: center;
          position: relative;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }
        .sub-category-article {
          text-transform: uppercase;
          font-size: 14px;
          color: #d72772;
          font-family: futuraBook;
          margin: 0;
        }
        .heading-title-article {
          font-family: limerickMedium;
          font-weight: bold;
          font-size: 16px;
          line-height: 1.33;
          margin-bottom: 10px;
          margin-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: var(--chakra-line-clamp);
          --chakra-line-clamp: 2;
        }
        .title-article {
          color: ${titlecolor};
          font-size: 14px;
        }
        .title-article:hover {
          color: #d72772;
        }
        .thumbnail-article {
          width: 130px;
        }
        .footer-card-landscape {
          -webkit-align-items: flex-start;
          -webkit-box-align: flex-start;
          -ms-flex-align: flex-start;
          align-items: flex-start;
        }
        .time-article {
          font-size: small;
          color: #4c4c4c;
        }
        .author-article {
          text-transform: uppercase;
          font-size: 12px;
          color: #484c4e;
          font-family: bahijMitra;
        }
      `}</style>
    </div>
  );
}
