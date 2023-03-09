import React, { useState, useRef, useEffect }         from "react";
import { ScrollControls, Scroll } from "@react-three/drei"
import { useFlexSize } from "@react-three/flex"

import ArticleHeader from "@components/other/ArticleHeader";
import ArticleInfo   from "@components/other/ArticleInfo";
import ArticleGallery from "@components/other/ArticleGallery";


const WorkArticle = ( { project }: Props ) => {
    const { images, url, link, tech } = project
	const [ header, setHeader ] = useState( false )
	const [ info, setInfo ] = useState( false )
	const [ width ] = useFlexSize()
	

    return (
        <ScrollControls
			pages={ 1.48 * width }
		>
			<Scroll>
				<ArticleHeader
                    image={ images[0] }
                    title={ link }
                    setHeader={ setHeader }
                />
                {
                    header && (
                        <ArticleInfo
                            tech={tech}
                            url={url}
                            link={link}
                            setInfo={setInfo}
                        />
                    )
                }

                {
					info && (
						<ArticleGallery images={ images } />
					)
				}
			
			</Scroll>
        </ScrollControls>
    )
}

export default WorkArticle;


type Props = {
    project: {
        id: number,
        images: any[],
        heights: number[],
        link: string,
        url: string,
        tech: string[]
    }
};
