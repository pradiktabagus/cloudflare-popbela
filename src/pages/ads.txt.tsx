import type { GetServerSideProps } from 'next';

function generateSiteMap(posts: string) {
  return posts;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const request = await fetch(`${process.env.CDN_FILES_URL}/text/ads.txt`).then(
    (response) => response.text().then((data) => data)
  );

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(request);

  res.setHeader('Content-Type', 'text/plain');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
