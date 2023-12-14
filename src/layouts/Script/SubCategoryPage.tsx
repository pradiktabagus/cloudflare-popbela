import Script from 'next/script';
import { Fragment } from 'react';

import { hostNameOrigin } from '@/utils/hostnameOrigin';

export const SubCategoryPageScript = () => {
  const baseUrl = hostNameOrigin();
  return (
    <Fragment>
      {/* Schema Markup Organization */}
      <Script
        id="Organization"
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `        
          {
            "@context" : "https://schema.org",
            "@type" : "Organization",
            "name" : "POPBELA.com",
            "url" : "https://www.popbela.com",
            "logo": "${baseUrl}/v3/images/global/logo.png",
            "sameAs" : [
              "https://www.facebook.com/popbelacom",
              "https://twitter.com/popbela_com",
              "https://www.instagram.com/popbela_com/"
            ]
          }
          `,
        }}
      />
      {/* End Schema Markup Organization */}
      {/* Schema Markup Website */}
      <Script
        id="Website"
        async
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.popbela.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.popbela.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }`,
        }}
      />
      {/* End Schema Markup Website */}
    </Fragment>
  );
};
