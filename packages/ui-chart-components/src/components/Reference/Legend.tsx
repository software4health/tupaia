/*
 * Tupaia
 * Copyright (c) 2017 - 2023 Beyond Essential Systems Pty Ltd
 */

import React from 'react';
import styled from 'styled-components';
import MuiButton from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { TooltipPayload } from 'recharts';
import { formatDataValueByType } from '@tupaia/utils';
import { CartesianChartConfig, PieChartConfig } from '@tupaia/types';
import { LegendPosition, ViewContent } from '../../types';
import { isMobile } from '../../utils';

const LegendContainer = styled.div<{
  $position?: LegendPosition;
  $isExporting?: boolean;
}>`
  display: flex;
  flex-wrap: ${props => (props.$isExporting ? 'nowrap' : 'wrap')};
  justify-content: ${props => (props.$position === 'bottom' ? 'center' : 'flex-start')};
  flex-direction: ${props => (props.$isExporting ? 'column' : 'row')};
  // Add more padding at the bottom for exports
  padding: ${props => {
    if (props.$isExporting) {
      return '1em';
    }
    return props.$position === 'bottom' ? '1rem 0 0 3.5rem' : '0 0 2rem 0';
  }};
`;

const PieLegendContainer = styled(LegendContainer)`
  padding: 0;
`;

const getLegendTextColor = (theme: any, isExporting: boolean) => {
  if (isExporting) {
    return '#2c3236';
  }

  if (theme.palette.type === 'light') {
    return theme.palette.text.primary;
  }
  return 'white';
};

const LegendItem = styled(({ isExporting, ...props }) => <MuiButton {...props} />)`
  text-align: left;
  font-size: 0.75rem;
  padding-bottom: 0;
  padding-top: 0;
  margin-right: 1.2rem;

  .MuiButton-label {
    display: flex;
    white-space: nowrap;
    align-items: ${isExporting => (isExporting ? 'left' : 'center')};
    color: ${({ theme, isExporting }) => getLegendTextColor(theme, isExporting)};
    > div {
      width: ${isExporting => (isExporting ? '100%' : '')};
    }
  }

  &.Mui-disabled {
    color: ${({ theme, isExporting }) => getLegendTextColor(theme, isExporting)};
  }

  // small styles
  &.small {
    font-size: 0.5rem;
    padding-bottom: 0;
    padding-top: 0;
    margin-right: 0;
  }
`;

const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 0.3rem;
  padding-top: 0.3rem;
`;

const Box = styled.span`
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.625rem;
  border-radius: 3px;

  // small styles
  &.small {
    width: 0.8rem;
    min-width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
  }
`;

const Text = styled.span`
  line-height: 1.4;
`;

function isPieChartConfig(config: PieChartConfig | {}): config is PieChartConfig {
  return (config as PieChartConfig).chartType === 'pie';
}

const getPieLegendDisplayValue = (
  chartConfig: PieChartConfig | {},
  value: string,
  item: any,
  viewContent: ViewContent,
  isEnlarged?: boolean,
  isMobileSize?: boolean,
) => {
  if (isPieChartConfig(chartConfig) && chartConfig[value as keyof PieChartConfig]?.label) {
    return chartConfig[value as keyof PieChartConfig].label;
  }
  const metadata = item[`${value}_metadata`];
  const labelSuffix = formatDataValueByType({ value: item.value, metadata }, viewContent.valueType);

  // on mobile the legend will show the actual formatDataValueByType after the label value
  return isMobileSize && isEnlarged ? `${value} ${labelSuffix}` : value;
};

interface PieLegendProps {
  chartConfig: PieChartConfig | {};
  isEnlarged?: boolean;
  isExporting?: boolean;
  legendPosition?: LegendPosition;
  viewContent: ViewContent;
}

export const getPieLegend = ({
  chartConfig = {},
  isEnlarged,
  isExporting,
  legendPosition,
  viewContent,
}: PieLegendProps) => ({ payload }: any) => {
  const isMobileSize = isMobile(isExporting);
  return (
    <PieLegendContainer $position={legendPosition} $isExporting={isExporting}>
      {payload.map(({ color, value, payload: item }: TooltipPayload) => {
        const displayValue = getPieLegendDisplayValue(
          chartConfig,
          value as string,
          item,
          viewContent,
          isEnlarged,
          isMobileSize,
        );

        return (
          <LegendItem
            key={value as string}
            isExporting={isExporting}
            className={isEnlarged && !isMobileSize ? 'enlarged' : 'small'}
            disabled
          >
            <TooltipContainer>
              <Box
                className={isEnlarged && !isMobileSize ? 'enlarged' : 'small'}
                style={{ background: color }}
              />
              <Text>{displayValue}</Text>
            </TooltipContainer>
          </LegendItem>
        );
      })}
    </PieLegendContainer>
  );
};

interface CartesianLegendProps {
  chartConfig: CartesianChartConfig;
  onClick: Function;
  getIsActiveKey: Function;
  isExporting?: boolean;
  legendPosition?: LegendPosition;
}

export const getCartesianLegend = ({
  chartConfig,
  onClick,
  getIsActiveKey,
  isExporting,
  legendPosition,
}: CartesianLegendProps) => ({ payload }: any) => {
  const isMobileSize = isMobile(isExporting);
  return (
    <LegendContainer $position={legendPosition} $isExporting={isExporting}>
      {payload.map(({ color, value, dataKey }: TooltipPayload) => {
        const displayValue = chartConfig[value as keyof CartesianChartConfig]?.label || value;

        return (
          <LegendItem
            key={value as string}
            onClick={() => onClick(dataKey)}
            isExporting={isExporting}
            className={isMobileSize ? 'small' : 'enlarged'}
            style={{ textDecoration: getIsActiveKey(value) ? '' : 'line-through' }}
          >
            <Tooltip title="Click to filter data" placement="top" arrow>
              <TooltipContainer>
                <Box
                  className={isMobileSize ? 'small' : 'enlarged'}
                  style={{ background: color }}
                />
                <Text>{displayValue}</Text>
              </TooltipContainer>
            </Tooltip>
          </LegendItem>
        );
      })}
    </LegendContainer>
  );
};
