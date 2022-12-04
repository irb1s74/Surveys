import {Suspense, useLayoutEffect} from 'react';
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "app/providers/router";
import {useDispatch} from "react-redux";
import {authByToken} from "entities/User";
import {PageLoader} from "widgets/PageLoader";

const App = () => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(authByToken())
    }, [dispatch])

    return (
        <Suspense fallback={<PageLoader/>}>
            <Navbar/>
            <AppRouter/>
        </Suspense>
    );
}

export default App;
