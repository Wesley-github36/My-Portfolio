import img1 from "@res/drawable/01.jpg";
import img2 from "@res/drawable/02.jpg"
import img3 from "@res/drawable/03.jpg"
import img4 from "@res/drawable/04.jpg"
import img5 from "@res/drawable/05.jpg"
import img6 from "@res/drawable/06.jpg"


export type IProjectDetails = {
    id: number,
    images: string[]
}

const ProjectDetails = [
    {
        id: 0,
        images: [ img1, img1, img1, img1, img1, img1 ],
        heights: [ 0.6, 0.42, 0.29, 0.5, 0.3, 0.44 ],
        link: "dan-j-wills",
        tech: ["ReactJS", "WebGL", "React.THREE", "THREE.js"],
        url: "/"
    }, {
        id: 1,
        images: [img2, img2, img2, img2, img2, img2],
        heights: [ 0.6, 0.3, 0.6, 0.6, 0.6, 0.6 ],
        link: "deer-valley",
        tech: ["ReactJS", "WebGL", "React.THREE", "THREE.js"],
        url: "/"

    }, {
        id: 2,
        images: [img3, img3, img3, img3, img3, img3],
        heights: [ 0.6, 0.55, 0.6, 0.55, 0.6, 0.55 ],
        link: "embem-rings",
        tech: ["ReactJS", "WebGL", "React.THREE", "THREE.js"],
        url: "/"


    }, {
        id: 3,
        images: [img4, img4, img4, img4, img4, img4],
        heights: [ 0.6, 0.6, 0.6, 0.6, 0.6, 0.6 ],
        link: "dita-wear",
        tech: ["ReactJS", "WebGL", "React.THREE", "THREE.js"],
        url: "/"


    }, {
        id: 4,
        images: [img5, img5, img5, img5, img5, img5],
        heights: [ 0.6, 0.6, 0.6, 0.6, 0.24, 0.6 ],
        link: "binne-djik",
        tech: ["ReactJS", "WebGL", "React.THREE", "THREE.js"],
        url: "/"


    }, {
        id: 5,
        images: [img6, img6, img6, img6, img6, img6],
        heights: [ 0.6, 0.4, 0.3, 0.34, 0.6, 0.34 ],
        link: "tagli-vini",
        tech: ["ReactJS", "WebGL", "React.THREE", "THREE.js"],
        url: "/"


    }
];

export default ProjectDetails;
