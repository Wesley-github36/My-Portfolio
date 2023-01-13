import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// const path = require("path");
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig( {
    plugins: [ react() ],
    resolve: {
        alias: {
            "@data"      : path.resolve( __dirname, "src/data/" ),
            "@components": path.resolve( __dirname, "src/components/" ),
            "@hooks"     : path.resolve( __dirname, "src/hooks/" ),
            "@res"       : path.resolve( __dirname, "src/res/" ),
            "@theme"     : path.resolve( __dirname, "src/theme/" ),
            "@util"      : path.resolve( __dirname, "src/util/" ),
            "@navigation": path.resolve( __dirname, "src/navigation/" )
        }
    }
} )
