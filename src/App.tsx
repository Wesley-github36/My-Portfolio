import React from 'react'
import { Route } from "react-router-dom"

import Router from "@navigation/Router";
import Scene from "@components/Scene"
import { RoutePath } from "@navigation/RoutePath";

function App() {

    return (
        <Router >
            <Route path={ RoutePath.Home } element={ <Scene page={ 1 } /> } />
            <Route path={ RoutePath.About } element={ <Scene page={ 2 } /> } />
            <Route path={ RoutePath.NotFound } element={ <Scene /> } />
        </Router >
    )
}

export default App
