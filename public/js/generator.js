var planetCard = $('.planet-info-card');
$(document).ready(function () {
    planetCard.hide();

    $('#addQuanta').on('click',function(){
        var quantaNumber = $('#quantaNumber').val();
        if(quantas.length>=2000){
            quantaNumber = 10;
            alert('You have so many quantas! This can cause slow your browser. Limited to add 10 more on this action.');
        }
        addBatchQuantas(quantaNumber);
    })

    $('#eraseQuanta').on('click',function(){
        var quantaToErase = $('#quantaNumber').val();
        if(quantas.length<quantaToErase){
            quantaToErase = quantas.length;
            alert('You dont have this number of quanta. Erasing the remainings quantas');
        }
        clearQuantas(quantaToErase);
    })
})
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

function resize() {
    var ratio = 16 / 9,
        preHeight = window.innerWidth / ratio;

    if (preHeight <= window.innerHeight) {
        renderer.setSize(window.innerWidth, preHeight);
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = preHeight;
    } else {
        var newWidth = Math.floor(window.innerWidth - (preHeight - window.innerHeight) * ratio);
        newWidth -= newWidth % 2 !== 0 ? 1 : 0;
        renderer.setSize(newWidth, newWidth / ratio);
        ctx.canvas.width = newWidth;
        ctx.canvas.height = newWidth / ratio;
    }

    renderer.domElement.style.width = '';
    renderer.domElement.style.height = '';
    renderer.domElement.style.left = ctx.canvas.style.left = (window.innerWidth - renderer.domElement.width) / 2 + 'px';
    renderer.domElement.style.top = ctx.canvas.style.top = (window.innerHeight - renderer.domElement.height) / 2 + 'px';
}

window.addEventListener('resize', resize);

resize();

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
var starColor = (function () {
    var colors = [0xFFFF00, 0x559999, 0xFF6339, 0xFFFFFF];
    return colors[Math.floor(Math.random() * colors.length)];
})(),
    size = 10 + Math.random() * 7,
    star = new THREE.Mesh(
        new THREE.SphereGeometry(size, 20, 20),
        new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
        })
    ),
    glows = [];

star.castShadow = false;
scene.add(star);

for (var i = 1, scaleX = 1.1, scaleY = 1.1, scaleZ = 1.1; i < 5; i++) {
    var starGlow = new THREE.Mesh(
        new THREE.SphereGeometry(7, 15, 15),
        new THREE.MeshBasicMaterial({
            color: starColor,
            transparent: true,
            opacity: 0.5
        })
    );
    starGlow.castShadow = false;
    scaleX += 0.4 + Math.random() * .5;
    scaleY += 0.4 + Math.random() * .5;
    scaleZ += 0.4 + Math.random() * .5;
    starGlow.scale.set(scaleX, scaleY, scaleZ);
    starGlow.origScale = {
        x: scaleX,
        y: scaleY,
        z: scaleZ
    };
    glows.push(starGlow);
    scene.add(starGlow);
}

var planetColors = [
    0x333333, //grey
    0x993333, //ruddy
    0xAA8239, //tan
    0x2D4671, //blue
    0x599532, //green
    0x267257 //bluegreen
],
    planets = [];

var planetNames = [
    'Decraruta',
    'Unanerth',
    'Ketrade',
    'Seon P71G',
    'Zilia 19',
    'Zokecury',
    'Suchotune',
    'Vega'
]
for (var p = 0, radii = 0; p < 10; p++) {
    var size = 4 + Math.random() * 7,
        type = Math.floor(Math.random() * planetColors.length),
        roughness = Math.random() > .6 ? 1 : 0,
        planetGeom = new THREE.Mesh(
            new THREE.SphereGeometry(size, 20, 20),
            new THREE.MeshLambertMaterial({
                color: planetColors[type],
                //shading: THREE.FlatShading
            })
        ),
        planet = new THREE.Object3D();

    planet.add(planetGeom);

    if (type > 1 && Math.random() > 0.5) {
        var atmoGeom = new THREE.Mesh(
            new THREE.SphereGeometry(size + 1.5, 20, 20),
            new THREE.MeshLambertMaterial({
                color: planetColors[3],
                //shading: THREE.FlatShading,
                transparent: true,
                opacity: 0.5
            })
        );

        atmoGeom.castShadow = false;
        planet.add(atmoGeom);
    }

    planet.orbitRadius = Math.random() * 50 + 50 + radii;
    planet.rotSpeed = 0.005 + Math.random() * 0.01;
    planet.rotSpeed *= Math.random() < .10 ? -1 : 1;
    planet.rot = Math.random();
    planet.orbitSpeed = 0;// (0.02 - p * 0.0048) * 0.04; //(0.02 - p * 0.0048) * 0.25;
    planet.orbit = Math.random() * Math.PI * 2;
    planet.position.set(planet.orbitRadius, 0, 0);

    radii = planet.orbitRadius + size;
    planets.push(planet);


    planet.cursor = 'pointer';
    planet.name = 'Planet ' + planetNames[Math.round(Math.random() * 7)];
    planet.planetColor = planetColors[type];
    scene.add(planet);
    planet.on('mousemove', function (ev) {
        setPlanetInfo(this)
        //console.log('%c' + planet.name + '%c => mouseover', 'color: #fff; background: #41b882; padding: 3px 4px;', 'color: #41b882; background: #fff;');
    });

    planet.on('mouseout', function (ev) {
        planetCard.hide();
    });


    var orbit = new THREE.Line(
        new THREE.CircleGeometry(planet.orbitRadius, 90),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: .05,
            side: THREE.BackSide
        })
    );
    orbit.geometry.vertices.shift();
    orbit.rotation.x = THREE.Math.degToRad(90);
    scene.add(orbit);
}

function setPlanetInfo(planet) {
    if (window.event /*&& window.event.hasOwnProperty('clientY')*/) {
        planetCard.html(`<p>${planet.name}</p><div id="planet-type"></div>`);
        planetCard.find('#planet-type').css({ 'background': `radial-gradient(circle at 100px 100px, #${planet.planetColor.toString(16)}, #000)` });
        planetCard.css({ top: window.event.clientY + 30, left: window.event.clientX + 30 });
        planetCard.show();
    }
}

//Lights
var light1 = new THREE.PointLight(starColor, 2, 0, 0);

light1.position.set(0, 0, 0);
scene.add(light1);

var light2 = new THREE.AmbientLight(0x990909, 0.5);
scene.add(light2);

//2D
var bgStars = [];

for (var i = 0; i < 500; i++) {
    var tw = {
        x: Math.random(),
        y: Math.random()
    }

    bgStars.push(tw);
}

//Stat tracking
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);


//Main Loop
var t = 0;

var quantas = [];

var loader = new THREE.OBJLoader();

var shipMeshes = []

function loadSCModel(modelName){
    loader.load(
        // resource URL
        `models/${modelName}.obj`,
        // called when resource is loaded
        function ( object ) {
            object.traverse( function( node ) {
                if( node.material ) {
                    node.material.side = THREE.DoubleSide;
                }
            });
            object.scale.set(0.00001,0.00001,0.00001)
            shipMeshes.push(object)
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
}

loadSCModel('Aegis_Sabre');
loadSCModel('MISC_Freelancer_MAX');
loadSCModel('RSI_Constellation_Aquila');

function quantaTravel(){
    quantas.forEach(quanta => {
        
        if(quanta.travelTarget){
            var targetPos = quanta.travelTarget.position
                tx = targetPos.x - quanta.position.x,
                tz = targetPos.z - quanta.position.z,
                dist = Math.sqrt(tx*tx+tz*tz),
                velX = (tx/dist)*quanta.speed,
                velZ = (tz/dist)*quanta.speed;
            if(dist < 1){
                console.log('Arrived!');
                //quanta.travelTarget = null;
                setRandomQuantaDestination(quanta);
            }else{
                quanta.position.set(quanta.position.x+velX,0,quanta.position.z+velZ)
                //quanta.position.set(THREE.Math.lerp(quanta.position.x,targetPos.x,aceleration), 0,THREE.Math.lerp(quanta.position.z,targetPos.z,aceleration))
                quanta.children[0].lookAt(targetPos.x,-999999,targetPos.z);
                //quanta.lookAt(targetPos.x,-999999,targetPos.z)
            }
        }
    });
}

var followedQuanta = null;

function addQuanta(){
    
    var quanta = new THREE.Group();
    var quanta3D = new THREE.LOD();
    var material = new THREE.MeshNormalMaterial();
    //Create spheres with 3 levels of detail and create new LOD levels for them
    for( var i = 0; i < 5; i++ ) {
        var radius = 4;
        var height = 5;
        var distance = 0;
        var faces = 4;
        switch(i){
            case 0:
                break;
            case 1:
                radius = 0.2;
                height = 0.4;
                distance = 80;
            break;
            case 2: 
                radius = 0.3;
                height = 0.6;
                faces = 3;
                distance = 500;
            break;
            case 3:
                radius = 0.8;
                height = 1;
                faces = 3;
                distance = 1000;
            break;
            case 4: 
                radius = 2.5;
                height = 3.5;
                faces = 3;
                distance = 1500;
            case 5:
                radius = 5;
                height = 8;
                faces = 3;
                distance = 3000;
            break;
        }
        
        var geometry = new THREE.CylinderGeometry(0, radius, height, faces, 1)
        
        var mesh = new THREE.Mesh( geometry, material );
        
        if(i == 0){

            mesh = shipMeshes[Math.floor(Math.random() * shipMeshes.length)].clone();
            mesh.rotation.set(Math.PI/2, 0, Math.PI)
        }
        quanta3D.addLevel( mesh, distance ); 
        
    }
    quanta.add(quanta3D);
    quanta.cursor = 'pointer';
    //planet.name = 'Planet ' + planetNames[Math.round(Math.random() * 7)];
    //planet.planetColor = planetColors[type];
    //scene.add(planet);
    
    quanta.position.set(1000,0,0);
    quanta.speed = Math.random() * (0.4 - 0.01) + 0.01;
    quantas.push(quanta);
    scene.add(quanta);
    quanta.on('click', function (ev) {

        quanta.add(camera);
        controls.reset();
        //camera.updateProjectionMatrix();
        controls.update();
        camera.position.set(0.15, 0.15, 0);
        followedQuanta = quanta;
        console.log('Click over quanta');
        //console.log('%c' + planet.name + '%c => mouseover', 'color: #fff; background: #41b882; padding: 3px 4px;', 'color: #41b882; background: #fff;');
    });
    setRandomQuantaDestination(quanta)
}


document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        followedQuanta = null;
        scene.add(camera);
        controls.reset();
        camera.position.set(700, 235, 0);
    }
};

function setRandomQuantaDestination(quanta){
    quanta.travelTarget = planets[Math.floor(Math.random() * planets.length)]
}

function setQuantaDestination(target){
    quantas.forEach(quanta => {
        quanta.travelTarget = target
    });
}

function addBatchQuantas(number){
    for(i=0;i<number;i++){
        addQuanta();
    }
    $('#quantaPopulation').html(quantas.length);
}


function clearQuantas(number){
    for(i=0;i<number;i++){
        quanta = quantas[i];
        scene.remove(scene.getObjectByProperty('uuid',quanta.uuid));
    }
    quantas.splice(0,number);
    $('#quantaPopulation').html(quantas.length);
}


function animate() {
    stats.begin();

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';

    for (var s in bgStars) {
        var q = bgStars[s],
            oX = q.x * ctx.canvas.width,
            oY = q.y * ctx.canvas.height,
            size = Math.random() < .9998 ? Math.random() : Math.random() * 3;

        ctx.beginPath();
        ctx.moveTo(oX, oY - size);
        ctx.lineTo(oX + size, oY);
        ctx.lineTo(oX, oY + size);
        ctx.lineTo(oX - size, oY);
        ctx.closePath();
        ctx.fill();
    }

    for (var p in planets) {
        var planet = planets[p];
        planet.rot += planet.rotSpeed
        planet.rotation.set(0, planet.rot, 0);
        planet.orbit += planet.orbitSpeed;
        planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
    }
    quantaTravel()
    t += 0.01;
    star.rotation.set(0, t, 0);
    for (var g in glows) {
        var glow = glows[g];
        glow.scale.set(
            Math.max(glow.origScale.x - .2, Math.min(glow.origScale.x + .2, glow.scale.x + (Math.random() > .5 ? 0.005 : -0.005))),
            Math.max(glow.origScale.y - .2, Math.min(glow.origScale.y + .2, glow.scale.y + (Math.random() > .5 ? 0.005 : -0.005))),
            Math.max(glow.origScale.z - .2, Math.min(glow.origScale.z + .2, glow.scale.z + (Math.random() > .5 ? 0.005 : -0.005)))
        );
        glow.rotation.set(0, t, 0);
    }

    if(followedQuanta){
        camera.lookAt(followedQuanta.position);
    }

    renderer.render(scene, camera);

    stats.end();

    requestAnimationFrame(animate);
}
animate();