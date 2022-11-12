import {Suspense} from 'react';
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "app/providers/router";

const App = () => {

    return (
        <Suspense fallback="">
            <Navbar/>
            <AppRouter/>
        </Suspense>
    );
}

export default App;
