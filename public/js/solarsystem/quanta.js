var quantas = [];
var pirates = [];
var security = [];





function quantaTravel(quantaType="quantas") {
    window[quantaType].forEach(quanta => {

        if (quanta.travelTarget) {
            var targetPos = quanta.travelTarget.position
            tx = targetPos.x - quanta.position.x,
                tz = targetPos.z - quanta.position.z,
                dist = Math.sqrt(tx * tx + tz * tz),
                velX = (tx / dist) * quanta.speed,
                velZ = (tz / dist) * quanta.speed;
            if (dist < 1) {
                console.log('Arrived!');
                //quanta.travelTarget = null;
                setRandomQuantaDestination(quanta);
            } else {
                quanta.position.set(quanta.position.x + velX, quanta.position.y, quanta.position.z + velZ)
                    //quanta.position.set(THREE.Math.lerp(quanta.position.x,targetPos.x,aceleration), 0,THREE.Math.lerp(quanta.position.z,targetPos.z,aceleration))
                quanta.children[0].lookAt(targetPos.x, -999999, targetPos.z);
                //quanta.lookAt(targetPos.x,-999999,targetPos.z)
            }
        }
    });
}



var lineVertexShader = `
  	varying vec3 vPos;
    void main() 
    {
      vPos = position;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 2.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `;

var lineFragmentShader = `
    uniform vec3 origin;
    uniform vec3 color;
    uniform float limitDistance;
  	varying vec3 vPos;

    void main() {
    	float distance = clamp(length(vPos - origin), 0., limitDistance);
      float opacity = 1. - distance / limitDistance;
      gl_FragColor = vec4(color, opacity);
    }

  `;

function addQuanta(quantaType="quantas") {
    var quanta = new THREE.Group();
    var quanta3D = new THREE.LOD();


    var colorMaterial = null;
    switch(quantaType){
        case "quantas": 
        colorMaterial = 0x00ff00;
        break;
        case "pirates": 
        colorMaterial = 0xff0000;
        break;
        case "security": 
        colorMaterial = 0x00BFFF;
        break;
    }
    var materialQuanta = new THREE.MeshLambertMaterial({
        color: colorMaterial,
        emissive: colorMaterial,
        emissiveIntensity: 0.6,
        side: THREE.DoubleSide
    });
    

    for (var i = 0; i < 5; i++) {
        var radius = 4;
        var height = 5;
        var distance = 0;
        var faces = 4;
        switch (i) {
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
                radius = 2.5;
                height = 3;
                faces = 3;
                distance = 1000;
                break;
            case 4:
                radius = 3.5;
                height = 5.5;
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

        
        var mesh = new THREE.Mesh(geometry, materialQuanta);

        if (i == 0) {

            mesh = shipMeshes[Math.floor(Math.random() * shipMeshes.length)].clone();
            mesh.traverse(function(child) {
                if (child instanceof THREE.Mesh){
                    child.material = materialQuanta;
                }
                });
            mesh.material = materialQuanta;
            mesh.rotation.set(Math.PI / 2, 0, Math.PI)
        }



        quanta3D.addLevel(mesh, distance);
    }
    var lineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -50, 0), new THREE.Vector3(0, 0, 0)]);
    var rayLine = new THREE.Line(lineGeom, new THREE.ShaderMaterial({
        uniforms: {
            color: {
                value: new THREE.Color(colorMaterial)
            },
            origin: {
                value: new THREE.Vector3()
            },
            limitDistance: {
                value: 50.0
            }
        },
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        transparent: true
    }));
    rayLine.name = "LineTrail";
    rayLine.interactive = false;
    rayLine.interactiveChildren = false;
    quanta3D.add(rayLine);




    quanta.add(quanta3D);

    //trails.push(lineGeom);



    quanta.cursor = 'pointer';
    //planet.name = 'Planet ' + planetNames[Math.round(Math.random() * 7)];
    //planet.planetColor = planetColors[type];
    //scene.add(planet);
    var possibleY = Math.random() * (1 - 0.1) + 0.1;
    possibleY *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    var possibleZ = possibleY

    quanta.position.set(1000, possibleY, possibleZ);
    quanta.speed = Math.random() * (0.4 - 0.01) + 0.01;
    window[quantaType].push(quanta);
    scene.add(quanta);

    quanta.addEventListener('click', function(ev) {

        if (ev.intersects && ev.intersects.length == 1 && ev.intersects[0].object.name == "LineTrail") {

        } else {
            quanta.add(camera);
            controls.reset();
            controls.update();
            camera.position.set(0.15, 0.5, 0);
            cameraFollowTo = quanta;
            console.log('Click over quanta');
        }
    });
    interactionManager.add(quanta);
    setRandomQuantaDestination(quanta)
}

function setRandomQuantaDestination(quanta) {
    quanta.travelTarget = planets[Math.floor(Math.random() * planets.length)]
}

/*function setQuantaDestination(target) {
    quantas.forEach(quanta => {
        quanta.travelTarget = target
    });
}*/

function addBatchQuantas(number,quantaType="quantas") {
    for (i = 0; i < number; i++) {
        addQuanta(quantaType);
    }
    $(`#${quantaType}Population`).html(window[quantaType].length);
}


function clearQuantas(number,quantaType="quantas") {
    for (i = 0; i < number; i++) {
        quanta = window[quantaType][i];
        scene.remove(scene.getObjectByProperty('uuid', quanta.uuid));
    }
    window[quantaType].splice(0, number);
    $(`#${quantaType}Population`).html(window[quantaType].length);
}

function setQuanta(number,quantaType="quantas"){
    let difference = Math.abs(number - window[quantaType].length) ;
    if (number >= difference){
        addBatchQuantas(difference,quantaType);
    }else{
        clearQuantas(difference,quantaType);
    }
}


