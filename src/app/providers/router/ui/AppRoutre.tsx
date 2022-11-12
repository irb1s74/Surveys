import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routeConfig} from "shared/config/routerConfig/routerConfig";
import {PageLoader} from "widgets/PageLoader";

const AppRouter = () => (
    <Suspense fallback={<PageLoader/>}>
        <div style={{marginTop: "64px", height: "calc(100vh - 64px)", padding: "34px 0"}}>
            <Routes>
                {Object.values(routeConfig).map(({path, element}) => (
                    <Route key={path} path={path} element={element}/>
                ))}
            </Routes>
        </div>
    </Suspense>
);

export default AppRouter;
