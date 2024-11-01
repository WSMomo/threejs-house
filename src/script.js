import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'
import { createFloor } from './canvas/floor'
import { createWalls } from './canvas/walls'
import { createRoof } from './canvas/roof'
import { addDoorLight, createDoor } from './canvas/door'
import { createBushes } from './canvas/bushes'
import { createGraves } from './canvas/graves'
import { createGhosts } from './canvas/ghosts'
import { setLights } from './canvas/lights'
import { setCamera } from './canvas/camera'
import { setSky } from './canvas/sky'
import { Timer } from 'three/examples/jsm/Addons.js'


// Setup
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Camera
// Base camera
const camera = setCamera(sizes)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap

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


// Floor
const floor = createFloor(textureLoader);
scene.add(floor)

//House
const house = new THREE.Group()
scene.add(house)

// Walls
createWalls(textureLoader, house)

// Roof
createRoof(textureLoader, house);

// Door
createDoor(textureLoader, house);

// Bushes
createBushes(textureLoader, house);

// Graves
const graves = new THREE.Group();
scene.add(graves)
createGraves(textureLoader, graves);

// Ghosts
const ghosts = new THREE.Group()
scene.add(ghosts)
const ghostsConfig = createGhosts(ghosts)

// Lights
const { ambientLight, directionalLight } = setLights()
scene.add(ambientLight, directionalLight)

// Door Light
const doorLight = addDoorLight(house)

// Sky
const sky = setSky()
scene.add(sky)

// Fog
scene.fog = new THREE.FogExp2('#02343f', 0.1)

// Animate
const timer = new Timer()

function tick() {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    doorLight.intensity = Math.random()

    // ghost
    ghosts.children.forEach((ghost, index) => {
        const ghostAngle = elapsedTime * ghostsConfig[index].elapsedTime;
        ghost.position.x = Math.cos(ghostAngle) * ghostsConfig[index].sinCos;
        ghost.position.z = Math.sin(ghostAngle) * ghostsConfig[index].sinCos;
        ghost.position.y = Math.sin(ghostAngle) * Math.sin(ghostAngle * 2.34) * Math.sin(ghostAngle * 3.45)
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()

// Debug
// const gui = new GUI()
// gui.add(floor.material, 'displacementScale').min(-1).max(1).step(0.001).name('floorDisplacementScale')
// gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')
// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);
