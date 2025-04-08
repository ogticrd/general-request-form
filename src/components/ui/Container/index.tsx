import * as React from 'react';
import MUIContainer from '@mui/material/Container';
// import { SxProps, Theme } from '@mui/material/styles';

interface IContainer {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  paddingY?: boolean;
  // sx?: SxProps<Theme>;
}

export const Container = ({
  children,
  maxWidth = 'xl',
  paddingY = true,
  // sx 
}: IContainer) => {
  return <MUIContainer
    // sx={sx}
    maxWidth={maxWidth}
    style={{
      paddingTop: paddingY ? "128px" : "",
      paddingBottom: paddingY ? "128px" : "",
    }}
  >
    {children}
  </MUIContainer>;
};
