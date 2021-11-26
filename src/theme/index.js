import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@material-ui/core';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
//
import shape from './shape';
import paletteWhite from './palette';
import paletteBlack from './paletteBlack';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadowsWhite';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
  themeSelection: false,
};

export default function ThemeConfig({ children, themeSelection }) {
  let palette = paletteWhite;
  if (themeSelection) {
    palette = paletteBlack;
  } else {
    palette = paletteWhite;
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
