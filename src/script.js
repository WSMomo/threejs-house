import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { MEASUREMENTS, TEXTURES } from './global'
import { setTexture } from './utils'
import { Sky } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const textureLoader = new THREE.TextureLoader()


// Floor
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

gui.add(floor.material, 'displacementScale').min(-1).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')
floor.material.side = THREE.DoubleSide
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
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

house.add(walls)

// Roof
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
house.add(roof)


// Door
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

// Bushes
const brushTextures = {
    color: textureLoader.load(TEXTURES.brush.color),
    arm: textureLoader.load(TEXTURES.brush.arm),
    normal: textureLoader.load(TEXTURES.brush.normal),
}
setTexture(brushTextures.color, 1, 1, true)
setTexture(brushTextures.arm, 1, 1)
setTexture(brushTextures.normal, 1, 1)

const bushesGeometry = new THREE.SphereGeometry(MEASUREMENTS.house.bushes.radius, MEASUREMENTS.house.bushes.heightSegments, MEASUREMENTS.house.bushes.widthSegments)
const bushesMaterial = new THREE.MeshStandardMaterial({
    map: brushTextures.color,
    normalMap: brushTextures.normal,
    aoMap: brushTextures.arm,
    roughnessMap: brushTextures.arm,
    metalnessMap: brushTextures.arm
})

MEASUREMENTS.house.bushes.config.forEach(bush => {
    const newBush = new THREE.Mesh(bushesGeometry, bushesMaterial)
    newBush.scale.setScalar(bush.scale)
    newBush.position.set(...bush.position)
    newBush.rotation.x = -0.75
    house.add(newBush)
})


door.position.z = MEASUREMENTS.house.walls.depth * 0.5 + 0.01
door.position.y = MEASUREMENTS.house.door.height * 0.5
house.add(door)

// Graves
const graves = new THREE.Group();
scene.add(graves)

const graveTextures = {
    color: textureLoader.load(TEXTURES.grave.color),
    arm: textureLoader.load(TEXTURES.grave.arm),
    normal: textureLoader.load(TEXTURES.grave.normal),
}
setTexture(graveTextures.color, 1, 1, true)
setTexture(graveTextures.arm, 1, 1)
setTexture(graveTextures.normal, 1, 1)


const graveGeometry = new THREE.BoxGeometry(MEASUREMENTS.house.graves.width, MEASUREMENTS.house.graves.height, MEASUREMENTS.house.graves.depth)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveTextures.color,
    normalMap: graveTextures.normal,
    aoMap: graveTextures.arm,
    roughnessMap: graveTextures.arm,
    metalnessMap: graveTextures.arm,
})

for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + (Math.random() * 5);
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x;
    grave.position.y = Math.random() * 0.4;
    grave.position.z = z;
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.1)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1.5)
directionalLight.position.set(6, 2, -8)
scene.add(directionalLight)

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 8)
doorLight.position.set(0, MEASUREMENTS.house.door.width, MEASUREMENTS.house.door.height)
house.add(doorLight)

// Ghosts
const ghosts = [
    {ghost: new THREE.PointLight('red', 1), elapsedTime: 0.5, sinCos: 4},
    {ghost: new THREE.PointLight('green', 1), elapsedTime: -0.38, sinCos: 5},
    {ghost: new THREE.PointLight('blue', 1), elapsedTime: 0.24, sinCos: 6},
]

ghosts.forEach(ghost=>{
    scene.add(ghost.ghost)
})
walls.castShadow = true
walls.receiveShadow = true

roof.castShadow = true
floor.receiveShadow = true


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
walls.castShadow = true
walls.receiveShadow = true

roof.castShadow = true
floor.receiveShadow = true

graves.children.forEach(grave=>{
    grave.castShadow = true
    grave.receiveShadow = true
})

// Cast and receive
directionalLight.castShadow = true


// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.far = 10

ghosts.forEach(ghost=>{
    ghost.ghost.shadow.mapSize.width = 256
    ghost.ghost.shadow.mapSize.height = 256
    ghost.ghost.shadow.camera.far = 10
})


// Sky
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// Fog
scene.fog = new THREE.FogExp2('#02343f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // ghost
    ghosts.forEach((ghost)=>{
        const ghostAngle = elapsedTime * ghost.elapsedTime;
        ghost.ghost.position.x = Math.cos(ghostAngle) * ghost.sinCos;
        ghost.ghost.position.z = Math.sin(ghostAngle) * ghost.sinCos;
        ghost.ghost.position.y = Math.sin(ghostAngle) * Math.sin(ghostAngle * 2.34) * Math.sin(ghostAngle * 3.45)
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()