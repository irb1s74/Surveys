import {Suspense, useEffect} from 'react';
import {Navbar} from "widgets/Navbar";
import {AppRouter} from "app/providers/router";
import {userActions} from "entities/User";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initialAuthData())
    }, [dispatch])
    return (
        <Suspense fallback="">
            <Navbar/>
            <AppRouter/>
        </Suspense>
    );
}

export default App;
