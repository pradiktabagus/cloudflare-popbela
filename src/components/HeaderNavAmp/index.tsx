import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import type { Category } from '@/types/category';

import { ChannelsAmp } from '../Channels';
import { IconGrid } from '../Icon/IconGrid';

interface ButtonAmpSideaToggleActionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'button';
  on: string;
  children: ReactNode;
}
const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
export const SearchButton = () => {
  const SEARCH_LINK = '/search';
  return (
    <>
      <style jsx>
        {`
          .header-search-link {
            color: #d72772;
          }
          .header-search-link:hover {
            color: #911348;
          }
        `}
      </style>
      <a href={SEARCH_LINK} className="header-search-link">
        <FontAwesomeIcon icon={faSearch} height="20px" />
      </a>
    </>
  );
};

export const HeaderNavAmp = ({
  categories,
}: {
  categories: Category[];
}): JSX.Element => {
  const router = useRouter();
  const activeCategory = router.query.category;

  const ButtonAmpSideaToggleAction = (
    props: ButtonAmpSideaToggleActionProps
  ): JSX.Element => {
    const { children } = props;

    return (
      <>
        <button {...props}>{children}</button>
        <style jsx>
          {`
            .toggle-btn {
              background: none;
              border: none;
              padding: 0;
              boxsize: 28px;
              color: primary;
              color: #d51c6a;
              cursor: pointer;
              display: flex;
              justifycontent: center;
              alignitems: center;
            }
            .toggle-btn:hover {
              color: #911348;
            }
            .close-btn {
              background: none;
              border: none;
              padding: 0;
              boxsize: 28px;
              color: primary;
              color: #911348;
              cursor: pointer;
              display: flex;
              justifycontent: center;
              alignitems: center;
            }
          `}
        </style>
      </>
    );
  };
  return (
    <>
      <header className="header-amp" data-testid="header-amp">
        <div className="header-center">
          <a href="/">
            <amp-img
              src="/v3/assets/images/global/logo.png"
              alt="unfortunately"
              layout="intrinsic"
              width="149px"
              height="35px"
            />
          </a>
          <div className="header-group-item">
            <SearchButton />
            <ButtonAmpSideaToggleAction
              className="toggle-btn"
              type="button"
              data-testid="toggle-open-sidebar"
              on="tap:sidebar.toggle"
            >
              <IconGrid width={20} height={20} />
            </ButtonAmpSideaToggleAction>
          </div>

          <amp-sidebar
            id="sidebar"
            className="sidebar-amp"
            layout="nodisplay"
            side="right"
          >
            <nav className="sidebar-header-amp" data-testid="amp-sidebar">
              <div className="header-center">
                <a href="/">
                  <amp-img
                    src="/v3/assets/images/global/logo.png"
                    alt="unfortunately"
                    layout="intrinsic"
                    width="149px"
                    height="35px"
                  />
                </a>
                <div className="header-group-item">
                  <SearchButton />
                  <ButtonAmpSideaToggleAction
                    className="toggle-btn"
                    type="button"
                    on="tap:sidebar.close"
                    data-testid="toggle-close-sidebar"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      height="20px"
                      color="#555"
                    />
                  </ButtonAmpSideaToggleAction>
                </div>
              </div>
              <div>
                <ul className="category-list-amp">
                  {categories.map((category) => (
                    <li
                      className="category-list-amp--li"
                      key={category.category_url + category.name}
                    >
                      <a
                        className={clsx({
                          'category-list-amp--li-link': true,
                          'active-category':
                            category.category_url === activeCategory,
                        })}
                        href={category?.category_url}
                      >
                        <span>{category?.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <ChannelsAmp />
              </div>
            </nav>
          </amp-sidebar>
          <style amp-custom jsx>{`
            .header-amp {
              background: #fff;
              position: fixed;
              width: 100%;
              top: 0;
              transition: top 0.5s;
              border-bottom: 1px solid #ccc;
            }
            .sidebar-amp {
              width: 100%;
              max-width: 100%;
              background: #fff;
            }
            .sidebar-header-amp {
              position: fixed;
              width: 100%;
              top: 0;
              transition: top 0.5s;
            }
            .category-list-amp {
              display: flex;
              flex-direction: column;
              overflow: scroll;
              gap: 5px;
              padding: 8px;
              list-style: none;
            }
            .category-list-amp--li {
              text-transform: uppercase;
              font-size: 17px;
              align-items: center;
              display: flex;
              font-family: FuturaBook, sans-serif;
            }

            .category-list-amp--li-link {
              text-decoration: none;
              padding: 7px;
              color: #373737;
            }

            .category-list-amp--li-link .active-category {
              color: #d72772;
            }

            .category-list-amp--li-link:hover {
              color: #d72772;
            }

            .header-search-link {
              color: #d72772;
            }
            .header-search-link:hover {
              color: #911348;
            }

            .link {
              text-decoration: none;
            }
            .header-center {
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              margin-right: auto;
              -webkit-align-items: center;
              -webkit-box-align: center;
              -ms-flex-align: left;
              align-items: center;
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              -webkit-justify-content: space-between;
              justify-content: space-between;
              max-width: full;
              background: #fff;
              padding: 12px 15px 8px;
            }
            .header-group-item {
              display: flex;
              gap: 10px;
            }
          `}</style>
        </div>
      </header>
    </>
  );
};
