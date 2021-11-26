import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@material-ui/core';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
//
import shape from './shape';
import paletteW from './palette';
import paletteB from './paletteBlack';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadowsW';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
  themeSelection: false,
};

export default function ThemeConfig({ children, themeSelection }) {
  let palette = paletteW;
  if (themeSelection) {
    palette = paletteB;
  } else {
    palette = paletteW;
  }
  const themeOptions = {
    palette,
    shape,
    typography,
    breakpoints,
    shadows,
    customShadows,
  };

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
