import * as THREE from 'three'

export function setLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#86cdff', 0.1)

    // Directional light
    const directionalLight = new THREE.DirectionalLight('#86cdff', 1.5)
    directionalLight.position.set(6, 2, -8)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 256
    directionalLight.shadow.mapSize.height = 256

    directionalLight.shadow.mapSize.width = 256
    directionalLight.shadow.mapSize.height = 256
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 20;



    return { ambientLight, directionalLight }
}