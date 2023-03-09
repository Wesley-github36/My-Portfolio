import React from "react";

import Titles      from "@components/other/Titles"
import Images      from "@components/other/Images"
import FlexScene from "@/final/FlexScene";


const Items = () => {

    return (
        <FlexScene
            renderPriority={ 1 }
        >
            <group>
                <Titles />
                <Images />
            </group>
        </FlexScene>
    )
}

export default Items;

