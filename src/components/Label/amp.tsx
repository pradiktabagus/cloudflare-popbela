import type { LabelProps, LabelsAmpProps } from '@/types/label';

export function LabelAmp({ title, path }: LabelProps) {
  return (
    <a href={path}>
      <div className="label-title">{title}</div>
      <style jsx>{`
        .label-title {
          background-color: #d72772;
          color: #fff;
          border-radius: 0.25em;
          font-weight: 400;
          padding: 4.5px 7px;
          display: inline-block;
          font-size: 16.5px;
          line-height: 1;
        }
      `}</style>
    </a>
  );
}
export function LabelsAmp({ paths, labelProps }: LabelsAmpProps) {
  return (
    <div className="label-amp-container">
      <ul data-testid="label-container">
        {paths.map((path) => (
          <li key={path.title} className="item-label-amp">
            <LabelAmp {...path} {...labelProps} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .label-amp-container {
          overflow: hidden;
          margin-bottom: 10px;
        }
        .label-amp-container > ul {
          --chakra-wrap-x-spacing: 0.5rem;
          --chakra-wrap-y-spacing: 0.5rem;
          --wrap-x-spacing: calc(var(--chakra-wrap-x-spacing) / 2);
          --wrap-y-spacing: calc(var(--chakra-wrap-y-spacing) / 2);
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex-wrap: wrap;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          list-style-type: none;
          padding: 0px;
          margin: calc(var(--wrap-y-spacing) * -1)
            calc(var(--wrap-x-spacing) * -1);
        }
        .label-amp-container > ul > *:not(style) {
          margin: var(--wrap-y-spacing) var(--wrap-x-spacing);
        }
        .item-label-amp {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: flex-start;
          -webkit-box-align: flex-start;
          -ms-flex-align: flex-start;
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
}
