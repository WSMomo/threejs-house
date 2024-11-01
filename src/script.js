import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { MEASUREMENTS, TEXTURES } from './global'
import { setTexture } from './utils'

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
    alpha : textureLoader.load(TEXTURES.floor.alpha),
    color : textureLoader.load(TEXTURES.floor.color),
    arm : textureLoader.load(TEXTURES.floor.arm),
    normal : textureLoader.load(TEXTURES.floor.normal),
    displacement : textureLoader.load(TEXTURES.floor.displacement)
}

setTexture(floorTextures.color, 8, 8, true)
setTexture(floorTextures.arm, 8, 8)
setTexture(floorTextures.normal, 8, 8)
setTexture(floorTextures.displacement, 8, 8)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(MEASUREMENTS.floor.width, MEASUREMENTS.floor.height,MEASUREMENTS.floor.widthSegments, MEASUREMENTS.floor.heightSegments), 
    new THREE.MeshStandardMaterial({
        transparent: true,
        alphaMap: floorTextures.alpha,
        map: floorTextures.color,
        aoMap: floorTextures.arm,
        roughnessMap: floorTextures.arm,
        metalnessMap: floorTextures.arm,
        normalMap: floorTextures.normal,
        displacementMap: floorTextures.displacement,
        displacementScale: 0.12,
        displacementBias: 0.002
    })
)

gui.add(floor.material, 'displacementScale').min(-1).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')
floor.material.side = THREE.DoubleSide
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)


const axesHelper = new THREE.AxesHelper(10)
scene.add(axesHelper)


/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
const wallTextures = {
    color : textureLoader.load(TEXTURES.wall.color),
    arm : textureLoader.load(TEXTURES.wall.arm),
    normal : textureLoader.load(TEXTURES.wall.normal),
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


walls.position.y += MEASUREMENTS.house.walls.height  * 0.5

house.add(walls)

// Roof
const roofTextures = {
    color : textureLoader.load(TEXTURES.brush.color),
    arm : textureLoader.load(TEXTURES.brush.arm),
    normal : textureLoader.load(TEXTURES.brush.normal),
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
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(MEASUREMENTS.house.door.width,MEASUREMENTS.house.door.height),
    new THREE.MeshStandardMaterial()
)

// Bushes
const brushTextures = {
    color : textureLoader.load(TEXTURES.brush.color),
    arm : textureLoader.load(TEXTURES.brush.arm),
    normal : textureLoader.load(TEXTURES.brush.normal),
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

MEASUREMENTS.house.bushes.config.forEach(bush=> {
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
    color : textureLoader.load(TEXTURES.grave.color),
    arm : textureLoader.load(TEXTURES.grave.arm),
    normal : textureLoader.load(TEXTURES.grave.normal),
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

for(let i = 0; i < 30; i ++){
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + (Math.random() * 4);
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
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()