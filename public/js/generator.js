//Renderer Elements
var lastZoomValue = 0;
var scaleValues = {
    multiplier: 0.0025025062,
    adjustment: 0.001002506265 
}

function rescaleFromCamera(obj, scaleZoom, minScale, maxScale = 1){
    camera.getWorldPosition(cameraWorldPos);
    var dist = obj.position.distanceTo(cameraWorldPos);
    var rescaleFactor = Math.max((scaleValues.multiplier * dist) - scaleValues.adjustment,minScale);
    var newScale = Math.min(rescaleFactor * scaleZoom, maxScale);
    obj.scale.set(newScale , newScale, newScale);
}

var cameraInitPos = {
    x:0,
    y:235,
    z:800
};
var cameraWorldPos = new THREE.Vector3();

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
    0.001, // Near plane
    40000 // Far plane
);

camera.position.set(cameraInitPos.x,cameraInitPos.y, cameraInitPos.z);

var interactionManager = new THREE.InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableKeys = true;
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.zoomSpeed = 5;

controls.addEventListener('change', resizePOV);

function resizePOV(e) {
    var zoomValue = controls.target.distanceTo(controls.object.position);
    if(zoomValue != lastZoomValue){
        lastZoomValue = zoomValue;
        planets.map(function(p){

            rescaleFromCamera(p, p.scaleZoom, 0.0015, 3);
            //p.scale.set(Math.min(planetScale * p.scaleZoom,3), Math.min(planetScale * p.scaleZoom,3), Math.min(planetScale * p.scaleZoom,3));
        });
        locatorPoints.map(function(l){
            rescaleFromCamera(l,5,0.00008,5)
            //x.scale.set(locatorScale,locatorScale,locatorScale);
        })
        stations.map(function(s){
            rescaleFromCamera(s,5,0.0008,10)
        })
    }
    //if(cameraFollowTo){
        /*var zoomedObject = controls.target.distanceTo(controls.object.position);
        if(cameraFollowTo){
            //zoomedObject = controls.object.position.distanceTo(cameraFollowTo.position);
        }
        var planetScale = 1;
        var locatorScale = 1;
        switch(true){
            case (zoomedObject < 50):
                locatorScale = 0.2;
                if(cameraFollowTo && cameraFollowTo.name == 'locator'){
                    locatorScale = 0.02;
                }
                planetScale = 0.0015;
                break;
            case (zoomedObject < 150):
                planetScale = 0.5;
                locatorScale = 0.2;
                break;
            case (zoomedObject < 250):
                planetScale = 0.5;
                locatorScale = 1;
                break;
            case (zoomedObject < 400):
                planetScale = 0.5;
                locatorScale = 1;
                break;
            default:
                planetScale = 3;
                locatorScale = 5;
                break;
        }*/
        

    //}
}

//Objects
createStar();

addPlanets(5, 0);

//addStation('aa');
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
    resizeCanvasToDisplaySize();
    interactionManager.update();
    controls.update();
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

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
  
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      // update any render target sizes here
    }
}
animate();
resizePOV();