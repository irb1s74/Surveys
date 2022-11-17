import {Suspense, useLayoutEffect} from 'react';
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "app/providers/router";
import {useDispatch} from "react-redux";
import {authByToken} from "entities/User/model/service/authByToken";

const App = () => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(authByToken())
    }, [dispatch])
    return (
        <Suspense fallback="">
            <Navbar/>
            <AppRouter/>
        </Suspense>
    );
}

export default App;
