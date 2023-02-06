import React from 'react'
import { Route } from "react-router-dom"

import Router from "@navigation/Router";
import { RoutePath } from "@navigation/RoutePath";
import Content from "@components/Content";

function App() {

    return (
        <Router >
            <Route path={ RoutePath.Home } element={ <Content page={ 1 } /> } />
            <Route path={ RoutePath.About } element={ <Content page={ 2 } /> } />
            <Route path={ RoutePath.Work } element={ <Content page={ 3 } /> } />
            <Route path={ RoutePath.NotFound } element={ <Content /> } />
        </Router >
    )
}

export default App
