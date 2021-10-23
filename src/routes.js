import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Job from "./JobList/job";
import JobDetail from "./JobList/jobDetail";

const Routes = () => {
    return (<>
        <Route
            exact
            path="/"
            component={Job}
        />
        <Route
            exact
            path="/Detail"
            component={JobDetail}
        />
    </>
    );
}
export default Routes;