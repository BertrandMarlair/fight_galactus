import React, {Fragment, Suspense} from "react";
import BottomNav from "../../../components/bottomNav/BottomNav";
import LoaderLayout from "../../../components/loading/LoaderLayout";

const Layout = ({children}) => (
    <Fragment>
        <Suspense fallback={<LoaderLayout />}>
            <BottomNav />
            {children}
        </Suspense>
    </Fragment>
);

export default Layout;
