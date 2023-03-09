import React                   from "react";
import Title                   from "@components/other/Title";
import Image                   from "@components/other/Image";
import { PixelsToUnits } from "@util/index";


const Item = (
    {
        flexSize,
        image,
        index,
        projectCount,
        text
    }: Props
) => {


    return (
        <group>
            <Title
                flexSize={ flexSize }
                text={ text }
                index={ index }
                projectCount={ projectCount }
            />
            {
				index < 6 && (
					<Image
                flexSize={ flexSize }
                image={ image }
                index={ index }
                projectCount={ projectCount }
                text={ text }
            />
				)
			}
        </group>
    )
}

export default Item;


type Props = {
    flexSize: number[],
    text: string,
    index: number,
    projectCount: number,
    image: any
}
