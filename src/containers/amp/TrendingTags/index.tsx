import { useDefaultComponent } from '@/adapters/hooks/components';
import type {
  ITrendingTags,
  ResponseTrendingTags,
} from '@/types/responses/components/trending-tags';

const TrendingTag = () => {
  const { data } = useDefaultComponent<ResponseTrendingTags>({
    end_point: '/trending-tags',
    version: 'v1',
  });
  const trendingTags = data?.data || [];
  return (
    <section data-testid="trending-tags" className="trending-tags">
      <h2 className="heading-trending-amp">Trending Topic</h2>
      <div id="trending_tags">
        <ul>
          {trendingTags
            ?.sort((a, b) => a.order_num - b.order_num)
            .map((item: ITrendingTags) => (
              <li key={item.order_num} className="label-trending-tag">
                <a href={item.url}>{item.tag?.name}</a>
              </li>
            ))}
        </ul>
      </div>
      <style jsx>{`
        .trending-tags {
          margin-bottom: 20px;
        }
        .heading-trending-amp {
          font-family: limerick;
          font-weight: 700;
          font-size: 16px;
          line-height: 1.33;
          border-bottom: 2px solid;
          border-color: #d72772;
          margin-bottom: 15px;
          margin-top: 20px;
          display: inline-block;
          width: 140px;
          text-transform: uppercase;
        }
        #trending_tags ul {
          padding: 0px;
          margin: 0px;
        }
        .label-trending-tag a {
          text-decoration: none;
          display: flex;
          align-items: center;
          color: #d72772;
        }
        .label-trending-tag {
          padding: 0.2px 0 0.3px 0;
          display: inline-flex;
          align-items: center;
          font-weight: 700;
          margin-right: 10px;
        }
        .label-trending-tag:after {
          content: '';
          display: inline-block;
          height: 16px;
          width: 1px;
          margin-left: 10px;
          background-color: #d72772;
        }
        .label-trending-tag:last-child:after {
          content: '';
          display: none;
        }
      `}</style>
    </section>
  );
};
export default TrendingTag;
