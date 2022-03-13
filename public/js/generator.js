//Renderer Elements
var lastZoomValue = 0;
var scaleValues = {
    multiplier: 0.0025025062,
    adjustment: 0.001002506265 
}
function resetCameraToCenter(){
    cameraFollowTo = null;
    controls.reset();
    camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z);
    resizePOV();
}

function centerToObjectAndZoom(obj){
    resetCameraToCenter();
    controls.target = obj.position
    camera.position = obj.position
    camera.lookAt(obj.position);
    controls.update();
    cameraFollowTo = obj;
    resizePOV();
    controls.constraint.dollyIn(5000)
}

function makeTextSprite( message, parameters )
{
    if ( parameters === undefined ) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:255, a:1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.fillText( message, borderThickness, fontsize + borderThickness);

    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
    return sprite;  
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
    0.1, // Near plane
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
        if(zoomValue <= 200){
            camera.near = 0.001
        }else{
            camera.near = 0.1;
        }
        lastZoomValue = zoomValue;
        planets.map(function(p){

            rescaleFromCamera(p, p.scaleZoom, 0.0015, 3);
            //p.scale.set(Math.min(planetScale * p.scaleZoom,3), Math.min(planetScale * p.scaleZoom,3), Math.min(planetScale * p.scaleZoom,3));
        });
        locatorPoints.map(function(l){
            rescaleFromCamera(l,5,0.0001,5)
            //x.scale.set(locatorScale,locatorScale,locatorScale);
        })
        stations.map(function(s){
            rescaleFromCamera(s,5,0.0005,1)
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
//createBgStars();

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