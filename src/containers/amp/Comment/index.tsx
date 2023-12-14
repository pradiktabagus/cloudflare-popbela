export type TCommentAmp = {
  url: string;
};
const CommentFacebookAmp = ({ url }: TCommentAmp) => {
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
export default CommentFacebookAmp;
