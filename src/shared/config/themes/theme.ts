import {createTheme} from "@mui/material";
import InterRegular from "shared/assets/fonts/InterRegular.woff2"

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
        ].join(','),
    },
    palette: {
        background: {
            default: '#F1F3F4'
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: "Inter";
                    src: url(${InterRegular}) format("woff2");
                    font-weight: 400;
                    font-display: swap;
                    font-style: normal;
                }
            `
        },
    }
});
