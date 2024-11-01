import * as THREE from 'three'

export function createGhosts(ghosts) {
    const ghostConfig = [
        { ghost: new THREE.PointLight('red', 1), elapsedTime: 0.5, sinCos: 4 },
        { ghost: new THREE.PointLight('green', 1), elapsedTime: -0.38, sinCos: 5 },
        { ghost: new THREE.PointLight('blue', 1), elapsedTime: 0.24, sinCos: 6 },
    ]

    ghostConfig.forEach(ghost => {
        ghost.ghost.shadow.mapSize.width = 256
        ghost.ghost.shadow.mapSize.height = 256
        ghost.ghost.shadow.camera.far = 10
        ghosts.add(ghost.ghost)
    })
    return ghostConfig;
}