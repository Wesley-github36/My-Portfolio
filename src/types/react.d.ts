import { Object3DNode } from "@react-three/fiber";
import { Group } from "three";


declare module "@react-three/fiber" {

    interface ThreeElements {
        group: Object3DNode<Group, typeof Group>,

    }

}



