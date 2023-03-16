// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
import { Camera } from 'three';

const scene = new THREE.Scene();
//Lighting
const light = new THREE.PointLight(0xffffff,8,100);
light.position.set(0,5,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, 800/600)
camera.position.z = 14;
scene.add(camera)

//render
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(800,600);

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

}) 

