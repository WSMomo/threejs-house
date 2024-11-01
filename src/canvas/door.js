import * as THREE from 'three'
import { MEASUREMENTS, TEXTURES } from "../global/global"
import { setTexture } from "../utils/utils"

export function createDoor(textureLoader, house) {
    const doorTextures = {
        color: textureLoader.load(TEXTURES.door.color),
        alpha: textureLoader.load(TEXTURES.door.alpha),
        ambientOcclusion: textureLoader.load(TEXTURES.door.ambientOcclusion),
        height: textureLoader.load(TEXTURES.door.height),
        normal: textureLoader.load(TEXTURES.door.normal),
        metalness: textureLoader.load(TEXTURES.door.metalness),
        roughness: textureLoader.load(TEXTURES.door.roughness),
    }


    setTexture(doorTextures.color, 1, 1, true)

    const door = new THREE.Mesh(
        new THREE.PlaneGeometry(MEASUREMENTS.house.door.width, MEASUREMENTS.house.door.height),
        new THREE.MeshStandardMaterial({
            map: doorTextures.color,
            transparent: true,
            alphaMap: doorTextures.alpha,
            aoMap: doorTextures.ambientOcclusion,
            displacementMap: doorTextures.height,
            normalMap: doorTextures.normal,
            metalnessMap: doorTextures.metalness,
            roughnessMap: doorTextures.roughness
        }
        )
    )
    door.position.z = MEASUREMENTS.house.walls.depth * 0.5 + 0.01
    door.position.y = MEASUREMENTS.house.door.height * 0.5
    house.add(door)
    return door;
}

export function addDoorLight(house) {
    const doorLight = new THREE.PointLight('#ff7d46', 8)
    doorLight.position.set(0, MEASUREMENTS.house.door.width, MEASUREMENTS.house.door.height)
    house.add(doorLight)
    return doorLight
}