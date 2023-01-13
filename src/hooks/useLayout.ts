import { useEffect, useState } from "react";

const useLayout = () => {

    const [ device, setDevice ] = useState( () => {
        const deviceName = getDeviceName();
        return getActiveDevice( deviceName )
    } );

    useEffect( () => {

        const handleResize = () => {
            const deviceName = getDeviceName();
            setDevice( () => getActiveDevice( deviceName ) )
        }

        window.addEventListener( "resize", handleResize );
        return () => window.removeEventListener( "resize", handleResize );

    }, [] )

    return device
}


export default useLayout

const deviceName = {
    mobileS: "mobileS",
    mobileM: "mobileM",
    mobileL: "mobileL",
    tabletS: "tabletS",
    tabletL: "tabletL",
    desktopXS: "desktopXS",
    desktopS: "desktopS",
    desktopM: "desktopM",
    desktopL: "desktopL",
    desktopXL: "desktopXL"
}
const getDeviceName = () => {
    if ( window.matchMedia( "(max-width: 330px)" ).matches ) return deviceName.mobileS
    if ( window.matchMedia( "(max-width: 400px)" ).matches ) return deviceName.mobileM
    if ( window.matchMedia( "(max-width: 480px)" ).matches ) return deviceName.mobileL
    if ( window.matchMedia( "(max-width: 600px)" ).matches ) return deviceName.tabletS
    if ( window.matchMedia( "(max-width: 768px)" ).matches ) return deviceName.tabletL
    if ( window.matchMedia( "(max-width: 900px)" ).matches ) return deviceName.desktopXS
    if ( window.matchMedia( "(max-width: 1080px)" ).matches ) return deviceName.desktopS
    if ( window.matchMedia( "(max-width: 1200px)" ).matches ) return deviceName.desktopM
    if ( window.matchMedia( "(max-width: 1440px)" ).matches ) return deviceName.desktopL

    return deviceName.desktopXL
}


const activeDevice = {
    "mobileS": false,
    "mobileM": false,
    "mobileL": false,
    "tabletS": false,
    "tabletL": false,
    "desktopXS": false,
    "desktopS": false,
    "desktopM": false,
    "desktopL": false,
    "desktopXL": false
}
const getActiveDevice = ( key: string ) => {
    let clonedActiveDevice = structuredClone( activeDevice )
    clonedActiveDevice = { ...clonedActiveDevice, [key]: true }

    return clonedActiveDevice
}

