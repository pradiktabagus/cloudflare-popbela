/* eslint-disable tailwindcss/no-custom-classname */
import Script from 'next/script';
import { useEffect, useState } from 'react';

export type CommentFacebookProps = {
  article_url: string;
};
export const CommentFacebook = ({ article_url }: CommentFacebookProps) => {
  const [orgUrl, setOrgUrl] = useState<string>('');

  useEffect(() => {
    setOrgUrl(`https://www.popbela.com${article_url}`);
  }, [article_url]);
  return (
    <section
      data-testid="section-comment"
      className="mb-5 mt-8 border-t border-[#bbb]"
    >
      <div id="fb-root"></div>
      <Script
        strategy="lazyOnload"
        async
        src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v3.1"
      />
      <div
        data-testid="comment-facebook"
        className="fb-comments"
        data-width="720"
        data-numposts="5"
        data-lazy={true}
        data-href={orgUrl}
      ></div>
    </section>
  );
};
export const CommentFacebookAmp = ({ url }: { url: string }) => {
  return (
    <div className="fb-comment">
      <amp-facebook-comments
        width={500}
        height={200}
        layout="responsive"
        data-numposts="5"
        data-href={`https://www.popbela.com${url}`}
      ></amp-facebook-comments>
    </div>
  );
};
