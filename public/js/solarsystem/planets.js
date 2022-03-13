var planetCard = $('.planet-info-card');
var insidePlanet = false;

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

var reductorCoordinates = 0.5;

var STANTON_PLANETS = [
    {
        'name': 'Crusader',
        'position': {
                'x': -189.62174,
                'y': 0,
                'z': -26.64960
        },
        'color': 0xFFFFFF,
        'texture': '/images/planets/STANTON/Planet_Stanton2.jpg',
        'size': 3,
        'scaleZoom': 6,
        'orbital_speed': 0,
        'atmo': 1,
        'moons': [
            {
                'name': 'Yela',
                'color': 0xFFFFFF,
                'position': {
                    'x': -190.22916,
                    'y': 0,
                    'z': -26.13996
                }
            },
            {
                'name': 'Daymar',
                'color': 0xFFFFFF,
                'position': {
                    'x': -189.30539,
                    'y': 0,
                    'z': -26.10158
                }
            },
            {
                'name': 'Cellin',
                'color': 0xFFFFFF,
                'position': {
                    'x': -189.87611,
                    'y': 0,
                    'z': -27.09009
                }
            }
        ],
        'stations': [
            {
                'name': 'CRU-L1',
                'color':'',
                'position': {
                    'x': -170.65959,
                    'y': 0,
                    'z': -23.98467
                },
            },
            {
                'name': 'Cru-L4',
                'color':'',
                'position': {
                    'x': -71.73162,
                    'y': 0,
                    'z': -177.54207
                },
            },
            {
                'name': 'CRU-L5',
                'color':'',
                'position': {
                    'x': -117.88995,
                    'y': 0,
                    'z': 150.89246
                },
            },
        ]
    },
    {
        'name': 'Hurston',
        'position': {
                'x': 128.50456,
                'y': 0,
                'z': 0
        },
        'color': 0xFFFFFF,
        'texture': '/images/planets/STANTON/Planet_Stanton3.jpg',
        'size': 3,
        'scaleZoom': 1,
        'orbital_speed': 0,
        'atmo': 1,
        'moons': [
            {
                'name': 'Ita',
                'color': 0xFFFFFF,
                'position': {
                    'x': 128.30195,
                    'y': 0,
                    'z': 1.14912
                }
            },
            {
                'name': 'Abderdeen',
                'color': 0xFFFFFF,
                'position': {
                    'x': 129.05757,
                    'y': 0,
                    'z': 0.40955
                }
            },
            {
                'name': 'Arial',
                'color': 0xFFFFFF,
                'position': {
                    'x': 128.92673,
                    'y': 0,
                    'z': -0.31476
                }
            },
            {
                'name': 'Magda',
                'color': 0xFFFFFF,
                'position': {
                    'x': 127.92686,
                    'y': 0,
                    'z': -0.74464
                }
            }
        ],
        'stations': [
            {
                'name': 'HUR-L1',
                'color':'',
                'position': {
                    'x': 115.65410,
                    'y': 0,
                    'z': 0
                },
            },
            {
                'name': 'HUR-L2',
                'color':'',
                'position': {
                    'x': 141.35497,
                    'y': 0,
                    'z': 0
                },
            },
            {
                'name': 'HUR-L3',
                'color':'',
                'position': {
                    'x': -128.50451,
                    'y': 0,
                    'z': 0
                },
            },
            {
                'name': 'HUR-L4',
                'color':'',
                'position': {
                    'x': 64.25226,
                    'y': 0,
                    'z': 111.28825
                },
            },
            {
                'name': 'HUR-L5',
                'color':'',
                'position': {
                    'x': 64.25238,
                    'y': 0,
                    'z': -111.28832
                },
            }
        ]
    },
    {
        'name': 'Arccorp',
        'position': {
                'x': 185.87664,
                'y': 0,
                'z': -221.5191
        },
        'color': 0xFFFFFF,
        'texture': '/images/planets/STANTON/Planet_Stanton.jpg',
        'size': 3,
        'scaleZoom': 1,
        'orbital_speed': 0,
        'atmo': 1,
        'moons': [
            {
                'name': 'Lyria',
                'color': 0xFFFFFF,
                'position': {
                    'x': 187.03607,
                    'y': 0,
                    'z': -221.21650
                }
            },
            {
                'name': 'Wala',
                'color': 0xFFFFFF,
                'position': {
                    'x': 183.79649,
                    'y': 0,
                    'z': -220.00466
                }
            }
        ],
        'stations': [
            {
                'name': 'ARC-L1',
                'color':'',
                'position': {
                    'x': 167.29134,
                    'y': 0,
                    'z': -199.37008
                },
            },
        ]
    },
    {
        'name': 'Microtech',
        'position': {
                'x': 224.62016,
                'y': 0,
                'z': 371.85625
        },
        'color': 0xFFFFFF,
        'texture': '/images/planets/STANTON/Planet_Stanton4.jpg',
        'size': 3,
        'scaleZoom': 1,
        'orbital_speed': 0,
        'atmo': 1,
        'moons': [
            {
                'name': 'Calliope',
                'color': 0xFFFFFF,
                'position': {
                    'x': 223.98370,
                    'y': 0,
                    'z': 371.68839
                }
            },
            {
                'name': 'Clio',
                'color': 0xFFFFFF,
                'position': {
                    'x': 224.76728,
                    'y': 0,
                    'z': 370.91018
                }
            },
            {
                'name': 'Euturpe',
                'color': 0xFFFFFF,
                'position': {
                    'x': 224.88110,
                    'y': 0,
                    'z': 370.81124
                }
            }
        ],
        'stations': [
            {
                'name': 'MIC-L1',
                'color':'',
                'position': {
                    'x': 202.15827,
                    'y': 0,
                    'z': 334.67069
                },
            },
        ]
    },
]

function addPlanets() {
    for (var p = 0; p < STANTON_PLANETS.length; p++) {
        var STANTON_PLANET = STANTON_PLANETS[p];
        STANTON_PLANET.position = {
            x: STANTON_PLANET.position.x * reductorCoordinates,
            y: STANTON_PLANET.position.y * reductorCoordinates,
            z: STANTON_PLANET.position.z * reductorCoordinates,
        }
        var planetGeom = new THREE.Mesh(
                new THREE.SphereGeometry(STANTON_PLANET.size, 20, 20),
                new THREE.MeshLambertMaterial({
                    color: STANTON_PLANET.color,
                    map: THREE.ImageUtils.loadTexture(STANTON_PLANET.texture)
                    //shading: THREE.FlatShading
                })
            ),
            planet = new THREE.Object3D();

        planet.add(planetGeom);
        planet.scaleZoom = STANTON_PLANET.scaleZoom;

        if (STANTON_PLANET.atmo) {
            var atmoGeom = new THREE.Mesh(
                new THREE.SphereGeometry(STANTON_PLANET.size + 0.3, 20, 20),
                new THREE.MeshLambertMaterial({
                    color: STANTON_PLANET.color,
                    //shading: THREE.FlatShading,
                    transparent: true,
                    opacity: 0.2
                })
            );
            atmoGeom.castShadow = false;
            planet.add(atmoGeom);
        }

        planet.orbit = Math.sqrt((STANTON_PLANET.position.x * STANTON_PLANET.position.x) + ((STANTON_PLANET.position.z * -1) * (STANTON_PLANET.position.z * -1)))

        planet.orbitRadius = planet.orbit;
        planet.rotSpeed = 0.005 + Math.random() * 0.01;
        planet.rotSpeed *= Math.random() < .10 ? -1 : 1;
        planet.rot = Math.random();
        planet.orbitSpeed = (0.02 - p * 0.0048) * STANTON_PLANET.orbital_speed;
        //planet.orbit = Math.random() * Math.PI * 2;
        
        planet.position.set(STANTON_PLANET.position.x, STANTON_PLANET.position.y, STANTON_PLANET.position.z * -1);
        

        planets.push(planet);


        planet.cursor = 'pointer';
        planet.name = STANTON_PLANET.name;
        planet.planetColor = STANTON_PLANET.color;
        planet.planetSize = STANTON_PLANET.size;
        scene.add(planet);

        var textSprite = makeTextSprite(planet.name, { fontsize: 44, textColor: {r:255, g:255, b:255, a:1.0}} );
        textSprite.position.set(2,5,0);
	    planet.add( textSprite );

        planet.addEventListener('mousemove',function(ev){
            setPlanetInfoPosition();
        })
        planet.addEventListener('mouseover', function(ev) {
            document.body.style.cursor = 'pointer';
            insidePlanet = this;
            setPlanetInfo(this);
                //console.log('%c' + planet.name + '%c => mouseover', 'color: #fff; background: #41b882; padding: 3px 4px;', 'color: #41b882; background: #fff;');
        });

        planet.addEventListener('dblclick', function(ev) {
            centerToObjectAndZoom(this)
        })

        planet.addEventListener('mouseout', function(ev) {
            insidePlanet = false;
            planetCard.hide();
            document.body.style.cursor = 'default';
        });
        interactionManager.add(planet);

        var orbit = new THREE.LineLoop(
            new THREE.CircleGeometry(planet.orbitRadius, 360),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: .35,
                side: THREE.BackSide
            })
        );
        orbit.geometry.vertices.shift();
        orbit.rotation.x = THREE.Math.degToRad(90);
        scene.add(orbit);

        STANTON_PLANET.moons.forEach(moon => {
            moon.position = {
                x: moon.position.x * 0.5,
                y: moon.position.y * 0.5,
                z: (moon.position.z * 0.5) * -1,
            }
            var moonGeom = new THREE.Mesh(
                new THREE.SphereGeometry(1, 20, 20),
                new THREE.MeshLambertMaterial({
                    color: moon.color,
                    //shading: THREE.FlatShading
                })
            ),
            moon3D = new THREE.Object3D();

            moon3D.add(moonGeom);
            moon3D.name = moon.name
            moon3D.scale.set(0.0015 , 0.0015, 0.0015)
            moon3D.position.set( moon.position.x, moon.position.y, moon.position.z)
            scene.add(moon3D);
            //moon3D.orbitRadius = Math.sqrt((Math.abs(planet.position.x - moon3D.position.x)*Math.abs(planet.position.x - moon3D.position.x)) + (Math.abs(planet.position.z - moon3D.position.z)*Math.abs(planet.position.z - moon3D.position.z)))
            moon3D.orbitRadius = moon3D.position.distanceTo(planet.position)

            var orbit = new THREE.LineLoop(
                new THREE.CircleGeometry(moon3D.orbitRadius, 360),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: .35,
                    side: THREE.BackSide
                })
            );
            orbit.geometry.vertices.shift();
            orbit.rotation.x = THREE.Math.degToRad(90);
            orbit.position.set(planet.position.x,planet.position.y,planet.position.z)
            console.log(orbit.position)
            scene.add(orbit);
            var textSprite = makeTextSprite(moon.name, { fontsize: 60, textColor: {r:255, g:255, b:255, a:1.0}} );
            textSprite.position.set(2,5,0);
            moon3D.add( textSprite );

            moon3D.addEventListener('dblclick', function(ev) {
                centerToObjectAndZoom(this)
            })
            moon3D.addEventListener('mouseover', function(ev) {
                document.body.style.cursor = 'pointer';
            });

            moon3D.addEventListener('mouseout', function(ev) {
                document.body.style.cursor = 'default';
            });
            interactionManager.add(moon3D);
        })
    }
}

/*
function addRandomPlanets(numberPlanets = 5, orbitalSpeed = 0.25) {
    for (var p = 0, radii = 0; p < numberPlanets; p++) {
        var size = 4 + Math.random() * 7,
            type = Math.floor(Math.random() * planetColors.length),
            roughness = Math.random() > .6 ? 1 : 0,
            planetGeom = new THREE.Mesh(
                new THREE.SphereGeometry(size, 20, 20),
                new THREE.MeshLambertMaterial({
                    color: planetColors[type],
                    map: THREE.ImageUtils.loadTexture('/images/planets/STANTON/Planet_Stanton4.jpg')
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

        planet.on('click', function(ev) {
            this.add(camera);
            controls.reset();
            controls.update();
            camera.position.set(this.position.x + (size * 40), 100, this.position.z + (size * 40));
            camera.lookAt(this.position);
            cameraFollowTo = this;
            console.log(this.position)
        })

        

        planet.on('mouseout', function(ev) {
            planetCard.hide();
        });


        var orbit = new THREE.LineLoop(
            new THREE.CircleGeometry(planet.orbitRadius, 90),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: .35,
                side: THREE.BackSide
            })
        );
        orbit.geometry.vertices.shift();
        orbit.rotation.x = THREE.Math.degToRad(90);
        scene.add(orbit);
    }
}
*/


function planetsRotation() {
    return false;
    for (var p in planets) {
        var planet = planets[p];
        planet.rot += planet.rotSpeed
        //planet.rotation.set(0, planet.rot, 0);
        planet.orbit += planet.orbitSpeed;
        planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
    }
}

function setPlanetInfo(planet) {
    if (insidePlanet /*&& window.event.hasOwnProperty('clientY')*/ ) {
        planetCard.html(`<p>${planet.name}</p><div id="planet-type"></div>`);
        planetCard.find('#planet-type').css({ 'background': `radial-gradient(circle at 100px 100px, #${planet.planetColor.toString(16)}, #000)` });
        planetCard.show();  
    }
}

function setPlanetInfoPosition(){
    planetCard.css({ top: window.event.clientY + 30, left: window.event.clientX + 30 });
}