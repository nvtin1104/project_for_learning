import {  amber, grey } from '@mui/material/colors';
export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: (mode === 'light' ? '#0A092D' : '#fff')
          },
        background: {
            ...(mode === 'light'
                ? {
                    bg: grey[50],
                    primary: grey[900],
                    secondary: grey[800],
                }
                : {
                    bg: '#0A092D',
                    primary: '#fff',
                    secondary: grey[500],
                }),
        },
        text: {
            ...(mode === 'light'
                ? {
                    primary: grey[900],
                    secondary: grey[800],
                }
                : {
                    primary: '#fff',
                    secondary: grey[500],
                }),
        },
    },
});