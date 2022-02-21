//Renderer Elements
var cameraInitPos = {
    x:0,
    y:235,
    z:800
};

var documentContainer = document.getElementById('galaxy-container');
var ctx = documentContainer.appendChild(document.createElement('canvas')).getContext('2d'),
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });



documentContainer.appendChild(renderer.domElement);
renderer.domElement.style.position =
    ctx.canvas.style.position = 'fixed';
ctx.canvas.style.background = 'black';

//Scene and Camera
var scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load( '/images/space_background.png' );

var camera = new THREE.PerspectiveCamera(
    20, // Field of view
    16 / 9, // Aspect ratio
    0.1, // Near plane
    40000 // Far plane
);

camera.position.set(cameraInitPos.x,cameraInitPos.y, cameraInitPos.z);

var interaction = new THREE.Interaction(renderer, scene, camera);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableKeys = true;
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.zoomSpeed = 5;

controls.addEventListener('change', resizePOV);

function resizePOV(e) {
    if(cameraFollowTo && camera.parent?.planetSize){
        var zoomedObject = controls.target.distanceTo( controls.object.position )
        console.log(zoomedObject);
        switch(true){
            case (zoomedObject < 50):
                locatorPoints.map(function(x){
                    x.scale.set(0.2,0.2,0.2);
                })
                break;
            case (zoomedObject < 150):
                cameraFollowTo.scale.set(0.0015 * cameraFollowTo.scaleZoom,0.0015 * cameraFollowTo.scaleZoom,0.0015 * cameraFollowTo.scaleZoom);
                locatorPoints.map(function(x){
                    x.scale.set(0.5,0.5,0.5);
                })
                break;
            case (zoomedObject < 250):
                cameraFollowTo.scale.set(0.01 * cameraFollowTo.scaleZoom,0.01 * cameraFollowTo.scaleZoom,0.01 * cameraFollowTo.scaleZoom);
                locatorPoints.map(function(x){
                    x.scale.set(5,5,5);
                })
                break;
            default:
                cameraFollowTo.scale.set(1,1,1);
                locatorPoints.map(function(x){
                    x.scale.set(1,1,1);
                })
                break;
        }
    }
}

//Objects
createStar();

addPlanets(5, 0);
//2D
createBgStars();

//Stat tracking
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
documentContainer.appendChild(stats.domElement);

//Main Loop
var t = 0;

function animate() {
    stats.begin();
    animateBgStars();
    planetsRotation();
    quantaTravel('quantas');
    quantaTravel('pirates');
    quantaTravel('security');
    t += 0.01;
    starRotation(t);
    if (cameraFollowTo) {
        camera.lookAt(cameraFollowTo.position);
    }

    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
}
animate();