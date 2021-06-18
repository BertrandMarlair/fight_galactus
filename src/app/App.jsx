import React, {Suspense, useMemo} from "react";
import {Provider, useSelector} from "react-redux";
import configureStore from "../core/store/store";
import RouteProvider from "./RouteProvider";
import MuiProvider from "./MuiProvider";
import LoaderLayout from "../components/loading/LoaderLayout";

const Container = () => {
    const connect = useSelector((state) => state.connected);
    const {connected} = connect;

    const Appolo = useMemo(() => {
        return <RouteProvider connected={connected} />;
    }, [connected]);

    return Appolo;
};

const App = () => (
    <Provider store={configureStore()}>
        <MuiProvider>
            <Suspense fallback={<LoaderLayout />}>
                <Container />
            </Suspense>
        </MuiProvider>
    </Provider>
);

export default App;
