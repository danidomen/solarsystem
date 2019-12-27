var quantas = [];
var followedQuanta = null;

function quantaTravel() {
    quantas.forEach(quanta => {

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
                quanta.position.set(quanta.position.x + velX, 0, quanta.position.z + velZ)
                    //quanta.position.set(THREE.Math.lerp(quanta.position.x,targetPos.x,aceleration), 0,THREE.Math.lerp(quanta.position.z,targetPos.z,aceleration))
                quanta.children[0].lookAt(targetPos.x, -999999, targetPos.z);
                //quanta.lookAt(targetPos.x,-999999,targetPos.z)
            }
        }
    });
}

function addQuanta() {
    var quanta = new THREE.Group();
    var quanta3D = new THREE.LOD();
    var material = new THREE.MeshNormalMaterial();

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

        var mesh = new THREE.Mesh(geometry, material);

        if (i == 0) {

            mesh = shipMeshes[Math.floor(Math.random() * shipMeshes.length)].clone();
            mesh.rotation.set(Math.PI / 2, 0, Math.PI)
        }
        quanta3D.addLevel(mesh, distance);

    }
    quanta.add(quanta3D);
    quanta.cursor = 'pointer';
    //planet.name = 'Planet ' + planetNames[Math.round(Math.random() * 7)];
    //planet.planetColor = planetColors[type];
    //scene.add(planet);

    quanta.position.set(1000, 0, 0);
    quanta.speed = Math.random() * (0.4 - 0.01) + 0.01;
    quantas.push(quanta);
    scene.add(quanta);
    quanta.on('click', function(ev) {

        quanta.add(camera);
        controls.reset();
        controls.update();
        camera.position.set(0.15, 0.15, 0);
        followedQuanta = quanta;
        console.log('Click over quanta');
    });
    setRandomQuantaDestination(quanta)
}

function setRandomQuantaDestination(quanta) {
    quanta.travelTarget = planets[Math.floor(Math.random() * planets.length)]
}

function setQuantaDestination(target) {
    quantas.forEach(quanta => {
        quanta.travelTarget = target
    });
}

function addBatchQuantas(number) {
    for (i = 0; i < number; i++) {
        addQuanta();
    }
    $('#quantaPopulation').html(quantas.length);
}


function clearQuantas(number) {
    for (i = 0; i < number; i++) {
        quanta = quantas[i];
        scene.remove(scene.getObjectByProperty('uuid', quanta.uuid));
    }
    quantas.splice(0, number);
    $('#quantaPopulation').html(quantas.length);
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