import * as THREE from 'three'
import { MEASUREMENTS, TEXTURES } from "../global/global"
import { setTexture } from "../utils/utils"

export function createWalls(textureLoader, house) {
    const wallTextures = {
        color: textureLoader.load(TEXTURES.wall.color),
        arm: textureLoader.load(TEXTURES.wall.arm),
        normal: textureLoader.load(TEXTURES.wall.normal),
    }
    setTexture(wallTextures.color, 1, 1, true)
    setTexture(wallTextures.arm, 1, 1)
    setTexture(wallTextures.normal, 1, 1)

    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(MEASUREMENTS.house.walls.width, MEASUREMENTS.house.walls.height, MEASUREMENTS.house.walls.depth),
        new THREE.MeshStandardMaterial({
            map: wallTextures.color,
            normalMap: wallTextures.normal,
            aoMap: wallTextures.arm,
            roughnessMap: wallTextures.arm,
            metalnessMap: wallTextures.arm
        })
    )

    walls.position.y += MEASUREMENTS.house.walls.height * 0.5
    walls.castShadow = true
    walls.receiveShadow = true

    house.add(walls)
    return walls;
}