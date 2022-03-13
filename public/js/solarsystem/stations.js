var stations = [];

var stationMaterial = new THREE.MeshLambertMaterial({
    color: 0x2D4671,
    //map: THREE.ImageUtils.loadTexture(STANTON_PLANET.texture),
    shading: THREE.FlatShading
})

function addStation(stationData){
    var station = meshesDAE[0].clone()
    station.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = stationMaterial;
        }
    });
    stationData.position = {
        x: stationData.position.x * reductorCoordinates,
        y: stationData.position.y * reductorCoordinates,
        z: stationData.position.z * reductorCoordinates,
    }
    station.scale.set(1,1,1);
    station.position.set(stationData.position.x, stationData.position.y, stationData.position.z * -1);
    station.material = stationMaterial;
    station.name = stationData.name;
    scene.add(station);
    stations.push(station);
    
    var textSprite = makeTextSprite(station.name, { fontsize: 38, textColor: {r:222, g:227, b:95, a:1.0}} );
    textSprite.position.set(2,1,0);
	station.add( textSprite );
}

function addStations(){
    STANTON_PLANETS.forEach(planet => {
        planet.stations.forEach(station => {
            addStation(station)
        })
    })
}