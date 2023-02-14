import img1 from "../res/drawable/01.jpg"
import img2 from "../res/drawable/02.jpg"
import img3 from "../res/drawable/03.jpg"

const state = {
    top: 0,
    pages: 0,
    threshold: 4,
    mouse: [ 0, 0 ],
    content: [
        {
            tag: '00',
            text: `The Bacchic\nand Dionysiac\nRites`,
            images: [ img1, img2, img3 ],
        },
        {
            tag: '01',
            text: `The Elysian\nMysteries`,
            images: [ img1, img2, img3 ],
        },
        {
            tag: '02',
            text: `The Hiramic\nLegend`,
            images: [ img1, img2, img3 ],
        },
    ],
    depthbox: [
        {
            depth: 0,
            color: '#CCCCCC',
            textColor: '#FFFFFF',
            text: 'In a void,\nno one could say\nwhy a thing\nonce set in motion\nshould stop anywhere.',
            image: img1,
        },
        {
            depth: -5,
            textColor: '#272727',
            text: 'For why should it stop\nhere rather than here?\nSo that a thing\nwill either be at rest\nor must be moved\nad infinitum.',
            image: img2,
        },
    ],
    lines: [
        { points: [ [ -20, 0, 0 ], [ -9, 0, 0 ] ], color: "black", lineWidth: 0.5 },
        { points: [ [ 20, 0, 0 ], [ 9, 0, 0 ] ], color: "black", lineWidth: 0.5 },
    ]
}

export default state
