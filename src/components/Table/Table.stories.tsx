import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '.';
import type { DataTableColumn } from '.';

interface Manuscript {
  id: number;
  title: string;
  author: string;
  year: number;
  pages: number;
  status: string;
}

const columns: DataTableColumn<Manuscript>[] = [
  { key: 'id', label: '#', width: 50, num: true },
  { key: 'title', label: 'Title' },
  { key: 'author', label: 'Author' },
  { key: 'year', label: 'Year', num: true },
  { key: 'pages', label: 'Pages', num: true },
  { key: 'status', label: 'Status', sortable: false },
];

const rows: Manuscript[] = [
  { id: 1, title: 'De Architectura', author: 'Vitruvius', year: 1486, pages: 320, status: 'Complete' },
  { id: 2, title: 'Codex Leicester', author: 'Leonardo da Vinci', year: 1510, pages: 72, status: 'Fragment' },
  { id: 3, title: 'Ars Magna', author: 'Ramon Llull', year: 1305, pages: 416, status: 'Complete' },
  { id: 4, title: 'Voynich Manuscript', author: 'Unknown', year: 1420, pages: 240, status: 'Undeciphered' },
  { id: 5, title: 'Book of Kells', author: 'Celtic Monks', year: 800, pages: 680, status: 'Complete' },
  { id: 6, title: 'Gutenberg Bible', author: 'Johannes Gutenberg', year: 1455, pages: 1282, status: 'Complete' },
  { id: 7, title: 'Liber Abaci', author: 'Fibonacci', year: 1202, pages: 459, status: 'Complete' },
  { id: 8, title: 'Domesday Book', author: 'Royal Commissioners', year: 1086, pages: 913, status: 'Complete' },
  { id: 9, title: 'Hypnerotomachia', author: 'Francesco Colonna', year: 1499, pages: 234, status: 'Complete' },
  { id: 10, title: 'Codex Seraphinianus', author: 'Luigi Serafini', year: 1981, pages: 360, status: 'Complete' },
  { id: 11, title: 'Red Book of Hergest', author: 'Various', year: 1400, pages: 362, status: 'Fragment' },
  { id: 12, title: 'Très Riches Heures', author: 'Limbourg Brothers', year: 1416, pages: 206, status: 'Incomplete' },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    columns: columns as DataTableColumn[],
    rows,
    pageSize: 10,
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SortedByYear: Story = {
  args: {
    defaultSort: { key: 'year', dir: 'asc' },
  },
};

export const SmallPageSize: Story = {
  args: {
    pageSize: 5,
  },
};

export const EmptyTable: Story = {
  args: {
    rows: [],
  },
};

export const FewRows: Story = {
  args: {
    rows: rows.slice(0, 3),
    pageSize: 10,
  },
};
