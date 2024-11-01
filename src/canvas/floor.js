import * as THREE from 'three'
import { MEASUREMENTS, TEXTURES } from "../global/global"
import { setTexture } from "../utils/utils"

export function createFloor(textureLoader) {
    const floorTextures = {
        alpha: textureLoader.load(TEXTURES.floor.alpha),
        color: textureLoader.load(TEXTURES.floor.color),
        arm: textureLoader.load(TEXTURES.floor.arm),
        normal: textureLoader.load(TEXTURES.floor.normal),
        displacement: textureLoader.load(TEXTURES.floor.displacement)
    }
    setTexture(floorTextures.color, 8, 8, true)
    setTexture(floorTextures.arm, 8, 8)
    setTexture(floorTextures.normal, 8, 8)
    setTexture(floorTextures.displacement, 8, 8)
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(MEASUREMENTS.floor.width, MEASUREMENTS.floor.height, MEASUREMENTS.floor.widthSegments, MEASUREMENTS.floor.heightSegments),
        new THREE.MeshStandardMaterial({
            transparent: true,
            alphaMap: floorTextures.alpha,
            map: floorTextures.color,
            aoMap: floorTextures.arm,
            roughnessMap: floorTextures.arm,
            metalnessMap: floorTextures.arm,
            normalMap: floorTextures.normal,
            displacementMap: floorTextures.displacement,
            displacementScale: 0.29,
            displacementBias: 0.002
        })
    )
    floor.material.side = THREE.DoubleSide
    floor.rotation.x = - Math.PI * 0.5
    floor.receiveShadow = true

    return floor;
}