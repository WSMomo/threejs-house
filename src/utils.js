import * as THREE from 'three'
export function setTexture(texture,u,v, color){
    texture.repeat.set(u,v)
    if (u !==1 ) texture.wrapS = THREE.RepeatWrapping
    if (v !==1 ) texture.wrapT = THREE.RepeatWrapping

    if (color) texture.colorSpace = THREE.SRGBColorSpace
}