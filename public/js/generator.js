//Renderer Elements
var ctx = document.body.appendChild(document.createElement('canvas')).getContext('2d'),
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

document.body.appendChild(renderer.domElement);
renderer.domElement.style.position =
    ctx.canvas.style.position = 'fixed';
ctx.canvas.style.background = 'black';

//Scene and Camera
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    20, // Field of view
    16 / 9, // Aspect ratio
    0.1, // Near plane
    20000 // Far plane
);

camera.position.set(700, 235, 0);

var interaction = new THREE.Interaction(renderer, scene, camera);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;

//Objects
createStar();

addPlanets(5);

//2D
createBgStars();

//Stat tracking
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

//Main Loop
var t = 0;

function animate() {
    stats.begin();
    animateBgStars();
    planetsRotation();
    quantaTravel()
    t += 0.01;
    starRotation(t);
    if (followedQuanta) {
        camera.lookAt(followedQuanta.position);
    }
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
}
animate();