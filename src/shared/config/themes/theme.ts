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
        primary: {
            main: "#FF0000"
        },
        secondary: {
            main: "#293240"
        },
        background: {
            default: '#E9ECEE'
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
