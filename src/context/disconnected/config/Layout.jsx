import React, {Fragment, Suspense} from "react";
import LoaderLayout from "../../../components/loading/LoaderLayout";

const Layout = ({children}) => (
    <Fragment>
        <Suspense fallback={<LoaderLayout />}>{children}</Suspense>
    </Fragment>
);

export default Layout;
