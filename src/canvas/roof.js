import * as THREE from 'three'
import { MEASUREMENTS, TEXTURES } from "../global/global"
import { setTexture } from "../utils/utils"

export function createRoof(textureLoader, house){
    const roofTextures = {
        color: textureLoader.load(TEXTURES.brush.color),
        arm: textureLoader.load(TEXTURES.brush.arm),
        normal: textureLoader.load(TEXTURES.brush.normal),
    }
    
    setTexture(roofTextures.color, 10, 1, true)
    setTexture(roofTextures.arm, 10, 1)
    setTexture(roofTextures.normal, 10, 1)
    
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(MEASUREMENTS.house.roof.radius, MEASUREMENTS.house.roof.height, MEASUREMENTS.house.roof.radialSegments),
        new THREE.MeshStandardMaterial({
            map: roofTextures.color,
            normalMap: roofTextures.normal,
            aoMap: roofTextures.arm,
            roughnessMap: roofTextures.arm,
            metalnessMap: roofTextures.arm
        })
    )
    
    roof.position.y += MEASUREMENTS.house.walls.height + (MEASUREMENTS.house.roof.height * 0.5)
    roof.rotation.y += Math.PI * 0.25
    roof.castShadow = true

    house.add(roof)
    return roof;
}