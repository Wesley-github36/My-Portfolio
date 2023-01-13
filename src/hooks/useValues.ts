import { useEffect, useState } from "react";
import useLayout from "@hooks/useLayout.js";

const useValues = () => {

    const device = useLayout()
    const [ values, setValues ] = useState<ValuesProps>( () => {
        if ( device.mobileS ) return { fontSize: 0.42 }
        if ( device.mobileM ) return { fontSize: 0.45 }
        return { fontSize: 0.5 }
    } );

    return values;
}

export default useValues

type ValuesProps = {
    fontSize: number
}

