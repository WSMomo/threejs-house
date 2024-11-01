import * as THREE from 'three'
import { MEASUREMENTS, TEXTURES } from "../global/global"
import { setTexture } from "../utils/utils"

export function createGraves(textureLoader, graves) {
    const graveTextures = {
        color: textureLoader.load(TEXTURES.grave.color),
        arm: textureLoader.load(TEXTURES.grave.arm),
        normal: textureLoader.load(TEXTURES.grave.normal),
    };
    setTexture(graveTextures.color, 1, 1, true);
    setTexture(graveTextures.arm, 1, 1);
    setTexture(graveTextures.normal, 1, 1);

    const graveGeometry = new THREE.BoxGeometry(
        MEASUREMENTS.house.graves.width,
        MEASUREMENTS.house.graves.height,
        MEASUREMENTS.house.graves.depth
    );
    const graveMaterial = new THREE.MeshStandardMaterial({
        map: graveTextures.color,
        normalMap: graveTextures.normal,
        aoMap: graveTextures.arm,
        roughnessMap: graveTextures.arm,
        metalnessMap: graveTextures.arm,
    });

    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 5;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        const grave = new THREE.Mesh(graveGeometry, graveMaterial);
        grave.position.set(x, Math.random() * 0.4, z);
        grave.rotation.set(
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4
        );

        graves.add(grave); // Aggiungi il grave al gruppo 'graves'
    }

    graves.children.forEach(grave => {
        grave.castShadow = true
        grave.receiveShadow = true
    })
    
}
