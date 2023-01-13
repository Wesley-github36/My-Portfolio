import React from "react";
import { BrowserRouter, Routes } from "react-router-dom"

const Router = ( { children }: RouterProps ) => {

    return (
        <BrowserRouter>
            <Routes>
                { children }
            </Routes>
        </BrowserRouter>
    )
}

export default Router;

type RouterProps = {
    children: React.ReactNode
}
