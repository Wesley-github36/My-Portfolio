import { gsap } from "gsap";
import { useThree } from "@react-three/fiber";

import { camera } from "@util/index";

const useTweenCameraFov = () => {

    const { camera: tCamera } = useThree();

    gsap.killTweensOf( tCamera );

    gsap.to( tCamera, {
        fov     : camera.fov(),
        duration: 1,
        onUpdate: () => {
            tCamera.updateProjectionMatrix()
            tCamera.position.set( 0, 0, camera.perspective )
            tCamera.lookAt(0, 0, 0)
        }
    } )
}

export default useTweenCameraFov;
