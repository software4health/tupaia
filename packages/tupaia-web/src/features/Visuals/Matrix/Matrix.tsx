/*
 * Tupaia
 *  Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Clear, Search } from '@material-ui/icons';
import { IconButton, Typography } from '@material-ui/core';
import {
  MatrixColumnType,
  MatrixRowType,
  Matrix as MatrixComponent,
  TextField,
  NoData,
} from '@tupaia/ui-components';
import { formatDataValueByType } from '@tupaia/utils';
import { MatrixConfig, MatrixReport, MatrixReportColumn, MatrixReportRow } from '@tupaia/types';
import { DashboardItemContext } from '../../DashboardItem';
import { MOBILE_BREAKPOINT, URL_SEARCH_PARAMS } from '../../../constants';
import { MatrixPreview } from './MatrixPreview';

const SearchInput = styled(TextField)`
  margin-bottom: 0;
  .MuiInputBase-root {
    background-color: transparent;
  }
`;

const NoResultsMessage = styled(Typography)`
  padding: 1rem;
`;

// This is a recursive function that parses the rows of the matrix into a format that the Matrix component can use.
const parseRows = (
  rows: MatrixReportRow[],
  categoryId?: MatrixReportRow['categoryId'],
  searchFilter?: string,
  drillDown?: MatrixConfig['drillDown'],
  valueType?: MatrixConfig['valueType'],
): MatrixRowType[] => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const onDrillDown = row => {
    if (!drillDown) return;
    const { itemCode } = drillDown;
    urlSearchParams.set(URL_SEARCH_PARAMS.REPORT, itemCode as string);
    urlSearchParams.set(
      URL_SEARCH_PARAMS.REPORT_DRILLDOWN_ID,
      row[drillDown?.parameterLink!] as string,
    );
    setUrlSearchParams(urlSearchParams);
  };

  let topLevelRows = [] as MatrixReportRow[];
  // if a categoryId is not passed in, then we need to find the top level rows
  if (!categoryId) {
    // get the highest level rows, which are the ones that have a category but no categoryId
    const highestLevel = rows.filter(row => !row.categoryId) as MatrixReportRow[];
    // if there are no highest level rows, then the top level rows are just all of the rows
    topLevelRows = highestLevel.length ? highestLevel : rows;
  } else {
    // otherwise, the top level rows are the ones that have the categoryId that was passed in
    topLevelRows = rows.filter(row => row.categoryId === categoryId);
  }
  // loop through the topLevelRows, and parse them into the format that the Matrix component can use
  return topLevelRows.reduce((result, row) => {
    const { dataElement = '', category, valueType: rowValueType, ...rest } = row;
    const valueTypeToUse = rowValueType || valueType;
    // if the row has a category, then it has children, so we need to parse them using this same function
    if (category) {
      const children = parseRows(rows, category, searchFilter, drillDown, valueTypeToUse);
      // if there are no child rows, e.g. because the search filter is hiding them, then we don't need to render this row
      if (!children.length) return result;
      return [
        ...result,
        {
          title: category,
          ...rest,
          children,
        },
      ];
    }
    // if the row is a regular row, and there is a search filter, then we need to check if the row matches the search filter, and ignore this row if it doesn't. This filter only applies to standard rows, not category rows.
    if (searchFilter && !dataElement.toLowerCase().includes(searchFilter.toLowerCase()))
      return result;
    // otherwise, handle as a regular row
    return [
      ...result,
      {
        title: dataElement,
        onClick: drillDown ? () => onDrillDown(row) : undefined,
        ...Object.entries(rest).reduce((acc, [key, item]) => {
          // some items are objects, and we need to parse them to get the value
          if (typeof item === 'object' && item !== null) {
            const { value, metadata } = item as { value: any; metadata?: any };
            return {
              ...acc,
              [key]: formatDataValueByType(
                {
                  value,
                  metadata,
                },
                valueTypeToUse,
              ),
            };
          }
          return {
            ...acc,
            [key]: formatDataValueByType({ value: item }, valueTypeToUse),
          };
        }, {}),
      },
    ];
  }, [] as MatrixRowType[]);
};

// This is a recursive function that parses the columns of the matrix into a format that the Matrix component can use.
const parseColumns = (columns: MatrixReportColumn[]): MatrixColumnType[] => {
  return columns.map(column => {
    const { category, key, title, columns: children } = column;
    // if a column has a category, then it has children, so we need to parse them using this same function
    if (category)
      return {
        title: category,
        key: category,
        children: parseColumns(children!),
      };
    // otherwise, handle as a regular column
    return {
      title,
      key,
    };
  });
};

/**
 * This is the component that is used to display a matrix. It handles the parsing of the data into the format that the Matrix component can use, as well as placeholder images. It shows a message when there are no rows available to display.
 */

const MatrixVisual = () => {
  const { config, report, isEnlarged } = useContext(DashboardItemContext);
  const { columns = [], rows = [] } = report as MatrixReport;
  const [searchFilter, setSearchFilter] = useState('');

  const { periodGranularity, drillDown, valueType } = config as MatrixConfig;

  const parsedRows = parseRows(rows, undefined, searchFilter, drillDown, valueType);
  const parsedColumns = parseColumns(columns);

  const updateSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  const clearSearchFilter = () => {
    setSearchFilter('');
  };

  if (!parsedRows.length && !searchFilter) {
    return (
      <NoData
        viewContent={{
          ...config,
          ...report,
        }}
      />
    );
  }

  // in the dashboard, show a placeholder image
  if (!isEnlarged) {
    return <MatrixPreview config={config} />;
  }

  return (
    <>
      <MatrixComponent
        {...config}
        rows={parsedRows}
        columns={parsedColumns}
        disableExpand={!!searchFilter}
        rowHeaderColumnTitle={
          periodGranularity ? null : (
            <SearchInput
              value={searchFilter}
              onChange={updateSearchFilter}
              placeholder="Search..."
              InputProps={{
                endAdornment: searchFilter ? (
                  <IconButton onClick={clearSearchFilter}>
                    <Clear />
                  </IconButton>
                ) : (
                  <Search />
                ),
              }}
            />
          )
        }
      />
      {searchFilter && !parsedRows.length && (
        <NoResultsMessage>No results found for the term: {searchFilter}</NoResultsMessage>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Make sure there is enough space for the mobile warning text
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    min-height: 5rem;
  }
`;

const MobileWarningText = styled.div`
  font-size: 1rem;
  text-align: center;
  width: 100%;
  padding: 0.5rem 0.5rem 1rem;

  @media (min-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const MobileWarning = () => {
  return (
    <MobileWarningText>
      Please note that the Tupaia matrix chart cannot be properly viewed on small screens.
    </MobileWarningText>
  );
};

export const Matrix = () => {
  return (
    <Container>
      <MobileWarning />
      <MatrixVisual />
    </Container>
  );
};
