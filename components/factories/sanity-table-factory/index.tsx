// index.tsx
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Table } from 'components/data-display/table';
import { InputFactory } from 'components/factories/input-factory';

import { sortTable } from './helpers/sort-table';
import { filterTable } from './helpers/filter-table';
import { transformData } from './helpers/transform-data';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

import type { SortOption } from './types/sort-option';
import type { TableData } from './types/table-data';

export interface Props extends React.ComponentProps<'table'> {
  data: TableData;
  striped?: boolean;
  solidHeader?: boolean;
  hideHeader?: boolean;
  titleCaseHeaders?: boolean;
  sorting?: Array<SortOption | '*'>;
  filtering?: Array<number | '*'>;
}

export const SanityTableFactory: React.FC<Props> = ({
  data,
  striped = true,
  titleCaseHeaders = true,
  solidHeader = true,
  hideHeader = false,
  sorting,
  filtering,
  className,
  ...props
}: Props) => {
  const { rows, columns } = transformData(data);
  const enableSortFilter =
    data.firstRowHeader && data.infoTable?.rows.length > 0;
  const [rowList, setRowList] = useState(rows);
  const [sortColumns, setSortColumns] = useState<SortOption[] | undefined>();
  const [currentSort, setCurrentSort] = useState<SortOption>();

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    header: string
  ) => {
    if (!enableSortFilter) return;
    const filterColumn = columns.findIndex((title) => title === header) + 1;
    const tableRows = filterTable(rows, e.target.value, filterColumn);
    setRowList(tableRows);
  };

  const handleSort = (headerIndex: number) => {
    if (!enableSortFilter) return;
    const sortColumn = headerIndex + 1;
    const sortOption = sortColumns?.find(
      (option) => option.column === sortColumn
    );
    if (sortOption) {
      const direction = currentSort?.direction ?? sortOption.direction;
      const newDirection = direction === 'asc' ? 'desc' : 'asc';
      const sortedRows = sortTable(rowList, sortColumn, newDirection);
      setRowList(sortedRows);
      setCurrentSort({ ...sortOption, direction: newDirection });
    }
  };

  useEffect(() => {
    if (enableSortFilter && sorting && data.infoTable?.rows.length > 0) {
      let options = [];
      if (sorting[0] !== '*') {
        options = sorting as SortOption[];
      } else {
        // Generate sort options for each displayed header; add 1 to account for the _key offset.
        options = columns.map((_header, index) => ({
          column: index + 1, // now index 0 header -> column 1, index 1 header -> column 2, etc.
          direction: 'asc',
          initial: index === 0
        })) as SortOption[];
      }
      const initialColumn =
        options.find((option) => option.initial) ?? options[0];
      setSortColumns(options as SortOption[]);
      setRowList(
        sortTable(rowList, initialColumn.column, initialColumn.direction)
      );
      setCurrentSort(initialColumn as SortOption);
    }
  }, [enableSortFilter, sorting]);

  return (
    <React.Fragment>
      {data.title && <h2 className="heading-medium mb-1">{data.title}</h2>}
      <Table className={className} striped={striped} {...props}>
        {data.description && <Table.Caption>{data.description}</Table.Caption>}
        {enableSortFilter && data.firstRowHeader && !hideHeader && (
          <Table.Head
            solid={solidHeader}
            className={styles[`header-${solidHeader ? 'solid' : 'default'}`]}
          >
            <Table.Row>
              {columns.map((header, index) => {
                const isSortable =
                  enableSortFilter &&
                  sortColumns?.find((option) => option.column === index);
                const isActive =
                  enableSortFilter && currentSort?.column === index;
                const sortDirection = currentSort?.direction ?? 'asc';
                return (
                  <Table.Cell
                    key={`header-${index}`}
                    th
                    className={isSortable ? styles['sortable-th'] : undefined}
                  >
                    {titleCaseHeaders
                      ? header.charAt(0).toUpperCase() + header.slice(1)
                      : header}
                    {isSortable && (
                      <span
                        role="button"
                        aria-label={`Sort by ${header} (${sortDirection})`}
                        className={cx(
                          styles['sort-arrow'],
                          styles[`dir-${sortDirection}`],
                          isActive && styles['active']
                        )}
                        onClick={() => handleSort(index)}
                      />
                    )}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          </Table.Head>
        )}
        <Table.Body>
          {enableSortFilter &&
            data.firstRowHeader &&
            filtering &&
            filtering?.length > 0 && (
              <Table.Row>
                {columns.map((header, index) => (
                  <Table.Cell key={`filter-${index}`}>
                    <InputFactory
                      label={`Filter by ${header}`}
                      hideLabel
                      name={`filter-${header}`}
                      type="text"
                      minWidth="0"
                      placeholder="Type to filter..."
                      className={styles['filter-input']}
                      onChange={(e) => handleFilter(e, header)}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          {rowList.map((row) => (
            <Table.Row key={`row-${row[0]}`}>
              {row.slice(1).map((cell, index) => (
                <Table.Cell
                  key={`cell-${row[0]}-${index}`}
                  className={hideHeader ? styles['hide-header'] : undefined}
                >
                  {React.isValidElement(cell) ? (
                    cell
                  ) : (
                    <p>{cell?.toString()}</p>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default SanityTableFactory;
