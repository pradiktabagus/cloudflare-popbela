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
  const { key } = query;
  if (!key) return { notFound: true };
  // We make an API call to gather the URLs for our site
  const request = await fetch(`${process.env.apiBaseUrl}/v1/feed?key=${key}`, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.apiKey ?? '',
      Accept: 'application/xml',
      'Content-Type': 'text/xml',
    },
  }).then((response) => {
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
    props: {},
  };
};

export default Feed;
