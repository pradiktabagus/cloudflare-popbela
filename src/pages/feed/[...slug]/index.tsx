import type { GetServerSideProps } from 'next';

function generateSiteMap(posts: string) {
  return posts;
}

function Feed() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const { key, slug } = query;
  // We make an API call to gather the URLs for our site
  if (!key) return { notFound: true };
  let url = 'feed';
  if (slug?.length === 1) {
    url += `/${slug[0]}`;
  } else if (slug?.length === 2) {
    url += `/${slug[0]}/${slug[1]}`;
  }
  const request = await fetch(
    `${process.env.apiBaseUrl}/v1/${url}?key=${key}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': process.env.apiKey ?? '',
        Accept: 'application/xml',
        'Content-Type': 'text/xml',
      },
    }
  ).then((response) => {
    if (!response.ok) {
      return response.statusText;
    }
    return response.text().then((data) => data);
  });
  if (request === 'Not Found')
    return {
      notFound: true,
    };
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(request);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    notFound: key === undefined,
    props: {},
  };
};

export default Feed;
