import * as THREE from 'three'

export function setCamera(sizes) {
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1)
    camera.position.x = 4
    camera.position.y = 2
    camera.position.z = 5
    return camera
}