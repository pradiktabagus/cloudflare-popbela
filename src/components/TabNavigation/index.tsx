import clsxm from '@/utils/clsxm';

import { CustomLink } from '../Link';

type Tab = {
  active?: boolean;
  url: string;
  name: string;
};

export type TabNavigationProps = {
  tabs: Tab[];
  activeTabName?: string;
  className?: string;
};

export const TabNavigation = ({
  tabs,
  activeTabName,
  className = '',
}: TabNavigationProps) => {
  return (
    <ul
      className={clsxm(
        'w-full md:text-center flex flex-row flex-nowrap justify-between md:block pb-[15px] md:pb-0 overflow-x-scroll md:overflow-hidden',
        className
      )}
    >
      {tabs.map((tab) => (
        <li
          key={tab.name + tab.url}
          className={clsxm(
            tab.active || tab.name === activeTabName
              ? 'text-primary'
              : 'text-title',
            'hover:text-primary',
            'font-futuraBook text-[18px] uppercase',
            'px-[5px]',
            'inline-block'
          )}
        >
          <CustomLink
            href={tab.url}
            className={clsxm(
              'text-[14px] md:text-[18px] p-0 md:py-[10px] md:px-[20px]'
            )}
          >
            {tab.name}
          </CustomLink>
        </li>
      ))}
    </ul>
  );
};
