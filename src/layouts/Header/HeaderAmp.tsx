import { useDefaultComponent } from '@/adapters/hooks/components';
import { HeaderNavAmp } from '@/components';
import type { Categories } from '@/types/category';

export const HeaderAMP = (): JSX.Element => {
  const { data } = useDefaultComponent<Categories>({
    end_point: '/categories',
  });
  return <HeaderNavAmp categories={data?.categories ?? []} />;
};
