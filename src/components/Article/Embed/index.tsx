import Script from 'next/script';
import { useEffect } from 'react';

import type { IArticleDetail } from '@/types/responses/pages/detail-article';

export type EmbedProps = { description?: string; listTicle?: IArticleDetail[] };
const Embed = ({ description, listTicle }: EmbedProps) => {
  // embed facebook
  useEffect(() => {
    const facebookScript = document.createElement('script');
    const facebookStartScript = document.createElement('script');
    const scriptFacebook = listTicle?.map((i) => i.type).includes('facebook');
    if (description?.includes('facebook') || scriptFacebook) {
      facebookScript.id = 'fb-sdk';
      facebookScript.async = true;
      facebookScript.defer = true;
      facebookScript.crossOrigin = 'anonymous';
      // facebookScript.nonce = '5JOEwLPT'
      const track = '';
      // const track = `&appId=${process.env.FACEBOOK_ID}&autoLogAppEvents=1`
      facebookScript.src = `https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v11.0${track}`;

      const code = `window.fbAsyncInit = function() {
        FB.init({
          appId            : '${process.env.FACEBOOK_APP_ID}',
          autoLogAppEvents : false,
          xfbml            : true,
          version          : 'v11.0'
    	  });
    	};`;
      facebookStartScript.appendChild(document.createTextNode(code));
      document.body.appendChild(facebookScript);
      document.body.appendChild(facebookStartScript);
      if (window.FB) {
        window.fbAsyncInit();
      }
      return () => {
        document.body.removeChild(facebookScript);
        document.body.removeChild(facebookStartScript);
      };
    }
    return () => {};
  }, [description, listTicle]);

  return (
    <>
      {description?.includes('instagram') ||
        (listTicle?.map((i) => i.type).includes('instagram') && (
          <Script
            id="instagram"
            dangerouslySetInnerHTML={{
              __html: `
                if (window.instgrm) {
                  window.instgrm.Embeds.process();
                }
              `,
            }}
          />
        ))}
      {description?.includes('facebook') ||
        (listTicle?.map((i) => i.type).includes('facebook') && (
          <Script
            id="fb"
            dangerouslySetInnerHTML={{
              __html: `
                if (window.FB) {
                  window.fbAsyncInit();
                }
              `,
            }}
          />
        ))}
    </>
  );
};

export default Embed;
