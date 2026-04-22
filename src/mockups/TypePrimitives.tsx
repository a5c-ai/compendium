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
