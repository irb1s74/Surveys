import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routeConfig, routeConfigPrivate} from "shared/config/routerConfig/routerConfig";
import {PageLoader} from "widgets/PageLoader";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";

const AppRouter = () => {
    const authData = useSelector(getUserAuthData);

    return (
        <div style={{marginTop: "64px", height: "calc(100vh - 64px)", padding: "34px 0"}}>
            <Suspense fallback={<PageLoader/>}>
                <Routes>
                    {authData ?
                        Object.values(routeConfigPrivate).map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        )) :
                        Object.values(routeConfig).map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))
                    }
                </Routes>
            </Suspense>
        </div>
    )
};

export default AppRouter;
