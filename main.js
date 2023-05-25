// Option 1: Import the entire three.js core library.
import * as THREE from './three';
import { Camera } from './three';
import "./style.css"
import {OrbitControls} from './three/examples/jsm/controls/OrbitControls'
import { MathUtils } from './three';

const scene = new THREE.Scene();
//Lighting
const light = new THREE.PointLight(0xffffff,8,100);
light.position.set(10,5,20);
// create fixed lighting position
var lightHolder = new THREE.Group();
lightHolder.add(light);

scene.add(lightHolder);
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
camera.position.z = 8;
scene.add(camera)






//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);

// Controls
const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;

// create sphere
const geometry = new THREE.SphereGeometry(3,100,100);
const loader = new THREE.TextureLoader();

loader.load('img/earth-dark.jpg',function(texture){
    const material = new THREE.MeshStandardMaterial({
        color:"#3285a8",
        map: texture 
    });
    const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


const seattle  = new THREE.Mesh(
    new THREE.SphereGeometry(0.01,20,20),
    new THREE.MeshBasicMaterial({color:0xff0000})
);


var getCoordinatesFromLatLng = function(latitude, longitude, radiusEarth)
{
   let latitude_rad = latitude * Math.PI / 180;
   let longitude_rad = longitude * Math.PI / 180;

   let xPos= radiusEarth * Math.cos(latitude_rad) * Math.cos(longitude_rad);
   let zPos = radiusEarth * Math.cos(latitude_rad) * Math.sin(longitude_rad);
   let yPos = radiusEarth * Math.sin(latitude_rad);
   
   return {x: xPos, y: yPos, z: zPos};
}

var seattlecoord = getCoordinatesFromLatLng(47.6062, 122.3321, 3);
seattle.position.set(seattlecoord.x,seattlecoord.y,seattlecoord.z)
scene.add(seattle)













//render whole scene after mesh texture is loaded

renderer.render(scene, camera);
const loop = () => {
    
    controls.update(); //creates rotation
    renderer.render(scene, camera)
    console.log("loopyyyyy")
    lightHolder.quaternion.copy(camera.quaternion);
    window.requestAnimationFrame(loop)
}
loop();



}) 



