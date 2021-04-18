import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const particalesGeometry = new THREE.BufferGeometry;
const particalesCnt = 5000;

const posArray =  new Float32Array(particalesCnt * 3);
// xyz, xyz, xyz, xyz

for(let i = 0; i < particalesCnt; i++){
    posArray[i] = (Math.random() - 0.5) * 10
}
particalesGeometry.setAttribute('position', 
    new THREE.BufferAttribute(posArray, 3)
)

// Materials

const material = new THREE.PointsMaterial({
    size: 0.005
})

const particalesMaterial = new THREE.PointsMaterial({
    size: 0.007
})


// Mesh
const sphere = new THREE.Points(geometry,material)
const particalesMesh = new THREE.Points(particalesGeometry, particalesMaterial)
scene.add(sphere, particalesMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'), 1)

//mouse 
document.addEventListener('mousemove', animateparticales)

let mouseX = 0
let mouseY = 0

function animateparticales(event){
    mouseX = event.clientX
    mouseY = event.clientY
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    particalesMesh.rotation.y = -0.02 * elapsedTime
    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    if(mouseX > 0){
        particalesMesh.rotation.x = mouseY * (elapsedTime * 0.00005)
        particalesMesh.rotation.y = mouseX * (elapsedTime * 0.00005)
    }
    

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()