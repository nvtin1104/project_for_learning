import { amber, deepOrange, grey } from '@mui/material/colors';
export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            ...amber,
            ...(mode === 'dark' && {
                main: amber[300],
            }),
        },
        ...(mode === 'dark' && {
            background: {
                // default: deepOrange[900],
                // paper: deepOrange[900],
            },
        }),
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