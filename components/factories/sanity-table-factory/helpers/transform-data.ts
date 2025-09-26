import { TableData } from '../types/table-data';

const parseCell = (cell: string): string | number => {
  const trimmed = cell.trim();
  if (trimmed.toLowerCase() === 'true') return '✅';
  if (trimmed.toLowerCase() === 'false') return '❌';
  const numRegex = /^[+-]?(\d+(\.\d+)?|\.\d+)$/;
  if (numRegex.test(trimmed)) return Number(trimmed);
  return cell;
};

export const transformData = (data: TableData) => {
  let headerTitles: string[] = [];
  let rows: (string | number)[][] = [];

  if (data?.firstRowHeader && data?.infoTable?.rows.length > 0) {
    headerTitles = data.infoTable.rows[0].cells.map((cell, i) =>
      cell !== undefined && cell !== null && cell !== ''
        ? cell
        : `column-${i + 1}`
    );
    rows = data.infoTable.rows
      .slice(1)
      .map((row) => [row._key, ...row.cells.map(parseCell)]);
  } else {
    const numColumns = data.infoTable?.rows[0]?.cells.length ?? 0;
    headerTitles = Array.from(
      { length: numColumns },
      (_, i) => `column-${i + 1}`
    );
    rows =
      data.infoTable?.rows.map((row) => [
        row._key,
        ...row.cells.map(parseCell)
      ]) || [];
  }

  return { rows, columns: headerTitles };
};
