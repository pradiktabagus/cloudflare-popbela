import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { isDesktop, isMobile } from 'react-device-detect';

import type { TContainerCustom404 } from '@/containers/custom404';
import { Meta } from '@/layouts/Meta';
import type { IMainProps } from '@/templates/Main';
import type { DeviceViewProps } from '@/types';
import type { ICustom404 } from '@/types/responses/pages/custom404';

export type TCustom404 = DeviceViewProps & {
  data: ICustom404;
};
const Custom404 = dynamic<TContainerCustom404>(
  () => import('@/containers/custom404')
);
const Main = dynamic<IMainProps>(() => import('@/templates/Main'));
const Index = (props: TCustom404) => {
  const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          description="POPBELA.com adalah media digital multi-platform tentang fashion, kecantikan, kultur pop, dan gaya hidup untuk perempuan Millennial & Gen Z di Indonesia."
          slug=""
          title="Popbela.com: A Pop-culture & Lifestyle for Millennials Women"
          url={
            `https://www.popbela.com${router.asPath}` ||
            'https://www.popbela.com'
          }
        />
      }
      isDesktop={isDesktop}
      isMobile={isMobile}
    >
      <Custom404 isDesktop={isDesktop} isMobile={isMobile} {...props} />
    </Main>
  );
};

export default Index;
