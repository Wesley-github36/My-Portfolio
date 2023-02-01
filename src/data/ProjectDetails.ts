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
        images: [img1, img1, img1, img1, img1, img1],
        link: "dan-j-wills"
    }, {
        id: 1,
        images: [img2, img2, img2, img2, img2, img2],
        link: "deer-valley"
    }, {
        id: 2,
        images: [img3, img3, img3, img3, img3, img3],
        link: "embem-rings"
    }, {
        id: 3,
        images: [img4, img4, img4, img4, img4, img4],
        link: "dita-wear"
    }, {
        id: 4,
        images: [img5, img5, img5, img5, img5, img5],
        link: "binne-djik"
    }, {
        id: 5,
        images: [img6, img6, img6, img6, img6, img6],
        link: "tagli-vini"
    }
];

export default ProjectDetails;
