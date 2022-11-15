import ReactDOM from 'react-dom/client';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {StoreProvider} from "app/providers/StoreProvider";
import {theme} from "shared/config/themes/theme";
import App from "app/App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreProvider>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </StoreProvider>
);
