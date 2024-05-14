import React from 'react'
import RootRouter from './router/root'
import { createTheme } from '@mui/material';
import { getDesignTokens } from './theme/palette';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from './redux/store';
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
export default function App() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
  
    // Update the theme only if the mode changes
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
              <Provider store={store}></Provider>
        <ThemeProvider theme={theme}>
            <RootRouter />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
  