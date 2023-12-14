import type { CardPromotionProps } from '@/types/card';

const ItemPartnerAmp = (item: any) => {
  return (
    <a
      className="items-partner"
      href={item.url}
      data-testid="item-partner"
      target="_blank"
      rel="noreferrer"
    >
      <div className="parner-wrap">
        <div className="image-wrap">
          <amp-img
            alt={item.partner.name}
            height="1.75rem"
            width="1.75rem"
            object-fit="cover"
            src={
              item.partner.icon_url === null
                ? 'https://cdn.popbela.com/content-images/avatar/dummy_200x200.jpg'
                : item.partner.icon_url
            }
          />
        </div>
        <div>
          <h2 data-testid="title-partner">{`Di ${item.partner.name}`}</h2>
        </div>
      </div>
      <style jsx>{`
        .items-partner {
          text-decoration: none;
          background-color: ${item?.partner?.color};
          color: white;
          border-color: ${item?.partner?.color};
          border-width: 1px;
          border-style: solid;
          border-radius: 4px;
          display: block;
        }
        .parner-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 8px;
          padding: 6px;
        }
        .image-wrap {
          position: relative;
          height: 1.75rem;
          width: 1.75rem;
        }
        .parner-wrap h2 {
          font-weight: bold;
          font-size: 16px;
          margin: 0;
        }
      `}</style>
    </a>
  );
};
function CardPromotionAmp({ title, partner }: CardPromotionProps) {
  return (
    <div data-testid="item-promotion" className="items-promotion">
      <div className="items-wrap">
        <h3 className="title-promotion" data-testid="title-promotion">
          {title}
        </h3>
        <div className="container-partner" data-testid="list-partner">
          {partner.map((item) => (
            <ItemPartnerAmp key={item.order_num} {...item} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .items-promotion {
          position: relative;
          min-height: 80px;
          border-radius: 5px;
          background: #ffe0ec;
          padding: 1.5rem;
        }
        .items-wrap {
          display: flex;
          flex-direction: column;
        }
        .title-promotion {
          font-family: futuraTemeed;
          font-weight: 700;
          color: #D61964;
          flex: 1;
          padding-left: 0px;
          align-items; center;
          line-height: 1.33;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
        }
        .container-partner {
          flex: 1;
          margin-top: 12px;
          row-gap: 6px;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
export { CardPromotionAmp };
