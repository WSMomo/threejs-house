import * as THREE from 'three'
import { MEASUREMENTS, TEXTURES } from "../global/global"
import { setTexture } from "../utils/utils"

export function createBushes(textureLoader, house){
    const brushTextures = {
        color: textureLoader.load(TEXTURES.brush.color),
        arm: textureLoader.load(TEXTURES.brush.arm),
        normal: textureLoader.load(TEXTURES.brush.normal),
    };
    setTexture(brushTextures.color, 1, 1, true);
    setTexture(brushTextures.arm, 1, 1);
    setTexture(brushTextures.normal, 1, 1);

    const bushesGeometry = new THREE.SphereGeometry(
        MEASUREMENTS.house.bushes.radius,
        MEASUREMENTS.house.bushes.heightSegments,
        MEASUREMENTS.house.bushes.widthSegments
    );
    const bushesMaterial = new THREE.MeshStandardMaterial({
        map: brushTextures.color,
        normalMap: brushTextures.normal,
        aoMap: brushTextures.arm,
        roughnessMap: brushTextures.arm,
        metalnessMap: brushTextures.arm
    });

    const bushes = new THREE.Group();

    MEASUREMENTS.house.bushes.config.forEach(bush => {
        const newBush = new THREE.Mesh(bushesGeometry, bushesMaterial);
        newBush.scale.setScalar(bush.scale);
        newBush.position.set(...bush.position);
        newBush.rotation.x = -0.75;
        bushes.add(newBush);
    });

    house.add(bushes)
    return bushes;
}