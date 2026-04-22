import { ReactNode } from 'react';

export interface TypeAtlasItem {
  name: string;
  demo: ReactNode;
  caption: string;
}

export interface TypePairItem {
  tag: string;
  title?: ReactNode;
  body?: ReactNode;
  aside?: ReactNode;
}

export interface TypeScaleRow {
  token: string;
  sample: ReactNode;
  spec: string;
}

export interface TypeProsePanel {
  title: ReactNode;
  lead: ReactNode;
  body: readonly ReactNode[];
}

export function TypeScaleTable({ items }: { items: readonly TypeScaleRow[] }) {
  return (
    <div className="mk-plate">
      <table className="mk-scale-table">
        <tbody>
          {items.map((item) => (
            <tr key={item.token}>
              <td className="mk-scale-token">{item.token}</td>
              <td className="mk-scale-sample">{item.sample}</td>
              <td className="mk-scale-specs">{item.spec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TypeProseGrid({ items }: { items: readonly TypeProsePanel[] }) {
  return (
    <div className="mk-type-prose">
      {items.map((item) => (
        <div key={`${item.title}`} className="mk-plate">
          <h4>{item.title}</h4>
          <p className="mk-type-lede">{item.lead}</p>
          {item.body.map((paragraph, index) => (
            <div key={index}>{paragraph}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TypeAtlasGrid({ items }: { items: readonly TypeAtlasItem[] }) {
  return (
    <div className="mk-type-atlas">
      {items.map((item) => (
        <article key={item.name} className="mk-atlas-item">
          <span className="mk-atlas-name">{item.name}</span>
          <div className="mk-atlas-demo">{item.demo}</div>
          <div className="mk-atlas-caption">{item.caption}</div>
        </article>
      ))}
    </div>
  );
}

export function TypePairGrid({
  items,
  wide,
}: {
  items: readonly TypePairItem[];
  wide?: boolean;
}) {
  return (
    <div className={`mk-type-pair ${wide ? 'mk-type-pair--wide' : ''}`.trim()}>
      {items.map((item) => (
        <div key={item.tag}>
          <span className="mk-type-pair__tag">{item.tag}</span>
          {item.aside}
          {item.title ? <h4>{item.title}</h4> : null}
          {item.body}
        </div>
      ))}
    </div>
  );
}
