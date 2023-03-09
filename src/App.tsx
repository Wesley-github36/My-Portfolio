import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation }                    from "react-router-dom"

import Router                 from "@navigation/Router";
import { RoutePath }          from "@navigation/RoutePath";
import Scene                from "@/final/Scene";




function App() {

    return (
        <Router >
            <Route path={ RoutePath.Home } element={ <Scene page={ 1 } /> } />
			{/* <Route path={ RoutePath.About } element={ <Content page={ 2 } /> } /> */}
			{/* <Route path={ RoutePath.Work } element={ <Content page={ 3 } /> } /> */}
			{/* <Route path={ RoutePath.NotFound } element={ <Content /> } /> */}
        </Router >
    )
}

export default App




