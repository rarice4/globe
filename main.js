// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import { Camera } from 'three';
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
//Lighting
const light = new THREE.PointLight(0xffffff,8,100);
light.position.set(0,5,10);
scene.add(light);
window.console.log("test")
// Window Size 
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Resize
window.addEventListener('resize', () => {
    console.log("blahhh")
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //camera
    
    camera.aspect = sizes.width / sizes.height;

    renderer.setSize(sizes.width, sizes.height);
    // const loop = () => {
        //renderer.render(scene, camera);
        camera.updateProjectionMatrix();
        console.log("looping")
        window.requestAnimationFrame(() =>{renderer.render(scene, camera)})
    // }
    // loop()
})

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
camera.position.z = 10;
scene.add(camera)






//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas);

// create sphere
const geometry = new THREE.SphereGeometry(3,100,100);
const loader = new THREE.TextureLoader()
loader.load('img/globe.jpeg',function(texture){
    const material = new THREE.MeshStandardMaterial({
        color:"#3285a8",
        map: texture 
    });
    const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//render whole scene after mesh texture is loaded
renderer.render(scene, camera);
const loop = () => {
    light.rotateX(30)
    light.rotateY(30)
    //light.rotation.y += 0.2
    //light.rotation.z += 0.2
    renderer.render(scene, camera)
    console.log("loopyyyyy")
    window.requestAnimationFrame(loop)
}
loop();



}) 



