import React, { useState, Fragment } from "react";
import { Icon } from "../Icon";

/* ── TreeNode (internal) ─────────────────────────────────── */

export interface TreeNodeData {
  id: string;
  label: string;
  count?: number;
  children?: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  depth?: number;
  expanded: Set<string>;
  setExpanded: (s: Set<string>) => void;
  selected: string | null;
  setSelected: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  depth = 0,
  expanded,
  setExpanded,
  selected,
  setSelected,
}) => {
  const isOpen = expanded.has(node.id);
  const hasKids = !!(node.children && node.children.length > 0);
  return (
    <>
      <div
        className="tkc-tree__node"
        data-open={isOpen || undefined}
        data-selected={selected === node.id || undefined}
        style={{ paddingLeft: 6 + depth * 16 }}
        onClick={() => {
          setSelected(node.id);
          if (hasKids) {
            const n = new Set(expanded);
            n.has(node.id) ? n.delete(node.id) : n.add(node.id);
            setExpanded(n);
          }
        }}
      >
        <span className="tkc-tree__caret">
          {hasKids ? <Icon name="chevronRight" size={11} /> : null}
        </span>
        <Icon
          name={hasKids ? "folder" : "file"}
          size={13}
          style={{ color: "var(--tkc-ink-soft)" }}
        />
        <span>{node.label}</span>
        {node.count != null && (
          <span className="tkc-tree__count">{node.count}</span>
        )}
      </div>
      {hasKids &&
        isOpen &&
        node.children!.map((c) => (
          <TreeNode
            key={c.id}
            node={c}
            depth={depth + 1}
            expanded={expanded}
            setExpanded={setExpanded}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </>
  );
};

/* ── Tree ────────────────────────────────────────────────── */

export interface TreeProps {
  data: TreeNodeData[];
  defaultExpanded?: string[];
  defaultSelected?: string | null;
  onSelect?: (id: string) => void;
}

export const Tree: React.FC<TreeProps> = ({
  data,
  defaultExpanded = [],
  defaultSelected = null,
  onSelect,
}) => {
  const [expanded, setExpanded] = useState(new Set(defaultExpanded));
  const [selected, setSelectedInternal] = useState<string | null>(
    defaultSelected
  );
  const setSelected = (id: string) => {
    setSelectedInternal(id);
    onSelect && onSelect(id);
  };
  return (
    <div className="tkc-tree">
      {data.map((n) => (
        <TreeNode
          key={n.id}
          node={n}
          expanded={expanded}
          setExpanded={setExpanded}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

/* ── Breadcrumbs ─────────────────────────────────────────── */

export interface BreadcrumbItem {
  label: string;
  [key: string]: unknown;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (item: BreadcrumbItem, index: number) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
}) => (
  <nav className="tkc-crumbs">
    {items.map((it, i) => (
      <Fragment key={i}>
        {i > 0 && <span className="sep">/</span>}
        {i === items.length - 1 ? (
          <span className="current">{it.label}</span>
        ) : (
          <a onClick={() => onNavigate && onNavigate(it, i)}>{it.label}</a>
        )}
      </Fragment>
    ))}
  </nav>
);

/* ── NavItem / Sidebar ───────────────────────────────────── */

export interface NavItemData {
  label: string;
  icon?: string;
  value: string;
  children?: NavItemData[];
}

export interface NavItemProps {
  item: NavItemData;
  active?: string;
  onSelect?: (value: string) => void;
  depth?: number;
}

export const NavItem: React.FC<NavItemProps> = ({
  item,
  active,
  onSelect,
  depth = 0,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasKids = !!(item.children && item.children.length > 0);
  return (
    <>
      <div
        className="tkc-tree__node"
        data-selected={active === item.value || undefined}
        style={{ paddingLeft: 6 + depth * 16 }}
        onClick={() => {
          if (hasKids) setExpanded((e) => !e);
          onSelect && onSelect(item.value);
        }}
      >
        {item.icon && (
          <Icon
            name={item.icon}
            size={13}
            style={{ color: "var(--tkc-ink-soft)" }}
          />
        )}
        <span>{item.label}</span>
        {hasKids && (
          <span className="tkc-tree__caret">
            <Icon name="chevronRight" size={11} />
          </span>
        )}
      </div>
      {hasKids &&
        expanded &&
        item.children!.map((c) => (
          <NavItem
            key={c.value}
            item={c}
            active={active}
            onSelect={onSelect}
            depth={depth + 1}
          />
        ))}
    </>
  );
};

export interface SidebarProps {
  items: NavItemData[];
  active?: string;
  onSelect?: (value: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  active,
  onSelect,
}) => (
  <div className="tkc-tree">
    {items.map((item) => (
      <NavItem
        key={item.value}
        item={item}
        active={active}
        onSelect={onSelect}
      />
    ))}
  </div>
);
