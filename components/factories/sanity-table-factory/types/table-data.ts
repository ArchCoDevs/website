type TableRow = {
  _key: string;
  _type: string;
  cells: string[];
};

type InfoTable = {
  rows: TableRow[];
};

export type TableData = {
  title?: string;
  description?: string;
  firstRowHeader?: boolean;
  infoTable: InfoTable;
};
