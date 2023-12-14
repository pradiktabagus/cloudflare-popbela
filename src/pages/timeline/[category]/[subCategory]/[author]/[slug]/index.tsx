import type { ContainerProps } from '@chakra-ui/layout';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { useDefaultPages } from '@/adapters/hooks/pages';
import { getDefaultSSRPages, getRedirectionPages } from '@/adapters/request';
import { Meta } from '@/layouts/Meta';
import { GlancePageScript } from '@/layouts/Script/GlancePage';
import { Campaign } from '@/templates/Campaign';
import type { ResponseGlance } from '@/types/responses/pages/glance';
import type { IRedirection } from '@/types/responses/pages/redirection';
import { getDeviceFromReq } from '@/utils/DeviceDetect';

const ContainerSection = dynamic<ContainerProps>(() =>
  import('@/components/Container').then((mod) => mod.ContainerSection)
);
const Custom500 = dynamic<any>(() => import('@/pages/500'));
const Custom404 = dynamic<any>(() => import('@/pages/404'));
const GlanceContainer = dynamic<any>(() => import('@/containers/glance'));
export default function PageGlance() {
  const router = useRouter();
  const { category, subCategory, author, slug } = router.query;
  const { data, isSuccess, isError, ...rest } = useDefaultPages<ResponseGlance>(
    {
      end_point: `timeline/${category}/${subCategory}/${author}/${slug}?key=${process.env.glanceKey}`,
    }
  );
  const { error }: any = rest;
  if (isError && error?.response.status === 500) {
    return <Custom500 />;
  }
  if (
    (isSuccess && Array.isArray(data)) ||
    (isError && error?.response.status === 404)
  ) {
    return <Custom404 />;
  }
  return (
    <Campaign
      script={<GlancePageScript />}
      meta={
        <Meta
          meta_title={data?.data?.title}
          meta_description={data?.data?.excerpt}
          slug={data?.data?.glanceUrl}
          title={data?.data.title}
          description={data?.data?.excerpt}
          url={`https://www.popbela.com${data?.data?.glanceUrl}`}
          img_cover={data?.data?.cover?.source_url}
          author={data?.data?.author?.name}
          noIndex
          noFollow
        />
      }
    >
      <Script
        id="glance"
        async
        dangerouslySetInnerHTML={{
          __html: `
    (function() {
        var domainsToDecorate = ['www.popbela.com'],
            queryParams = ['utm_source','utm_medium']
        // do not edit anything below this line
        var links = document.querySelectorAll('a'); 
        // check if links contain domain from the domainsToDecorate array and then decorates
        for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
            for (var domainIndex = 0; domainIndex < domainsToDecorate.length; domainIndex++) {
                if (links[linkIndex].href.indexOf(domainsToDecorate[domainIndex]) > -1 && links[linkIndex].href.indexOf("#") === -1) {
                    links[linkIndex].href = decorateUrl(links[linkIndex].href);
                }
            }
        }
        // decorates the URL with query params
        function decorateUrl(urlToDecorate) {
            urlToDecorate = (urlToDecorate.indexOf('?') === -1) ? urlToDecorate + '?' : urlToDecorate + '&';
            var collectedQueryParams = [];
            for (var queryIndex = 0; queryIndex < queryParams.length; queryIndex++) {
                if (getQueryParam(queryParams[queryIndex])) {
                    collectedQueryParams.push(queryParams[queryIndex] + '=' + getQueryParam(queryParams[queryIndex]))
                }
            }
            return urlToDecorate + collectedQueryParams.join('&');
        } 
        // a function that retrieves the value of a query parameter
        function getQueryParam(name) {
            if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search)) return decodeURIComponent(name[1]);
        }
    })();`,
        }}
      />
      <ContainerSection maxW={730}>
        <GlanceContainer />
      </ContainerSection>
    </Campaign>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { category, subCategory, author, slug } = query;
  const url = `/${category}/${subCategory}/${author}/${slug}`;
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery([`timeline${url}`, 'v1'], () =>
      getDefaultSSRPages({
        end_point: `timeline${url}?key=${process.env.glanceKey}`,
      })
    );
  } catch (error: any) {
    if (error.response.status === 404) {
      const { redirection }: IRedirection = await getRedirectionPages(
        `v1/redirection?url=/timeline${url}`
      );
      if (redirection?.status_code !== 404) {
        return {
          props: {},
          redirect: {
            destination: redirection?.url,
            statusCode: Number(redirection?.status_code),
          },
        };
      }
      return {
        props: {},
        notFound: true,
      };
    }
  }

  const devices = getDeviceFromReq(req);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...devices,
    },
  };
};
