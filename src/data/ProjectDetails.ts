import img1 from "../res/drawable/project1/greenctg.jpg";
import img2 from "../res/drawable/project2/cavinimg.jpg"
import img3 from "../res/drawable/project3/utracker.jpg"
import img4 from "../res/drawable/project4/04.jpg"
import img5 from "../res/drawable/project5/02.jpg"
import img6 from "../res/drawable/project6/06.jpg"


export type IProjectDetails = {
    id: number,
    images: string[]
}

const ProjectDetails = [
    {
        id: 0,
        images: [img1, img1, img1, img1, img1, img1]
    }, {
        id: 1,
        images: [img2, img2, img2, img2, img2, img2]
    }, {
        id: 2,
        images: [img3, img3, img3, img3, img3, img3]
    }, {
        id: 3,
        images: [img4, img4, img4, img4, img4, img4]
    }, {
        id: 4,
        images: [img5, img5, img5, img5, img5, img5]
    }, {
        id: 5,
        images: [img6, img6, img6, img6, img6, img6]
    }
];

export default ProjectDetails;