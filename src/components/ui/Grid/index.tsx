import React from 'react';
import Grid from '@mui/material/Grid';

interface IContainer {
  children: React.ReactNode;
  spacing?: number;
  direction?: 'row' | 'row-reverse' | 'column' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

export const GridContainer = ({
  children,
  spacing,
  direction,
  justifyContent,
  alignItems,
}: IContainer) => (
  <Grid
    container
    direction={direction ? direction : "row"}
    spacing={spacing ? spacing : 5}
    justifyContent={justifyContent ? justifyContent : 'flex-start'}
    alignItems={alignItems ? alignItems : "flex-start"}
  >
    {children}
  </Grid>
);

export interface IItem {
  children?: React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const GridItem = ({
  children,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 4,
  xl,
}: IItem) => (
  <Grid size={{ xs, sm, md, lg, xl }}>
    {children}
  </Grid>
);
