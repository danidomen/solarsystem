var planetCard = $('.planet-info-card');

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

function addPlanets(numberPlanets = 5, orbitalSpeed = 0.25) {
    for (var p = 0, radii = 0; p < numberPlanets; p++) {
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
        planet.orbitSpeed = (0.02 - p * 0.0048) * orbitalSpeed;
        planet.orbit = Math.random() * Math.PI * 2;
        planet.position.set(planet.orbitRadius, 0, 0);

        radii = planet.orbitRadius + size;
        planets.push(planet);


        planet.cursor = 'pointer';
        planet.name = 'Planet ' + planetNames[Math.round(Math.random() * 7)];
        planet.planetColor = planetColors[type];
        scene.add(planet);
        planet.on('mousemove', function(ev) {
            setPlanetInfo(this)
                //console.log('%c' + planet.name + '%c => mouseover', 'color: #fff; background: #41b882; padding: 3px 4px;', 'color: #41b882; background: #fff;');
        });

        planet.on('mouseout', function(ev) {
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
}


function planetsRotation() {
    for (var p in planets) {
        var planet = planets[p];
        planet.rot += planet.rotSpeed
        planet.rotation.set(0, planet.rot, 0);
        planet.orbit += planet.orbitSpeed;
        planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
    }
}

function setPlanetInfo(planet) {
    if (window.event /*&& window.event.hasOwnProperty('clientY')*/ ) {
        planetCard.html(`<p>${planet.name}</p><div id="planet-type"></div>`);
        planetCard.find('#planet-type').css({ 'background': `radial-gradient(circle at 100px 100px, #${planet.planetColor.toString(16)}, #000)` });
        planetCard.css({ top: window.event.clientY + 30, left: window.event.clientX + 30 });
        planetCard.show();
    }
}