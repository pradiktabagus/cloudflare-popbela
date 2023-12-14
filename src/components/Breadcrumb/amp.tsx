import type { Category } from '@/types/category';

import { IconFaAngleRight } from '../Icon/FaAngleRight';

export type BreadcrumbAmp = {
  category: Category;
  sub_category: Category;
};
const Index = ({ category, sub_category }: BreadcrumbAmp) => {
  return (
    <ul className="section-breadcrumb" data-testid="section-breadcrumb">
      <li>
        <a href="/">Home</a>
        <div className="ic-separate">
          <IconFaAngleRight height={16} width={16} />
        </div>
      </li>
      <li>
        <a href={category?.category_url}>{category?.name}</a>
        <div className="ic-separate">
          <IconFaAngleRight height={16} width={16} />
        </div>
      </li>
      <li>
        <a className="active-tab" href={sub_category?.category_url}>
          {sub_category?.name}
        </a>
      </li>
      <style jsx>
        {`
          a {
            text-decoration: none;
            color: #000000;
            font-weight: 600;
          }
          .active-tab {
            color: #d72772;
          }
          li {
            font-size: 18px;
            display: flex;
            gap: 5px;
            align-items: center;
          }
          .ic-separate {
            display: flex;
            color: #ccc;
          }
          .section-breadcrumb {
            list-style: none;
            display: flex;
            gap: 10px;
            margin: 0;
            padding-inline-start: 0;
          }
        `}
      </style>
    </ul>
  );
};
export default Index;
