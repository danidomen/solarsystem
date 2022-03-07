var stations = [];

var stationMaterial = new THREE.MeshLambertMaterial({
    color: 0x2D4671,
    //map: THREE.ImageUtils.loadTexture(STANTON_PLANET.texture),
    shading: THREE.FlatShading
})

function addStation(stationName){
    var station = meshesDAE[0].clone()//new THREE.Mesh(meshesDAE[0].clone, stationMaterial);
    station.traverse(function(child) {
        if (child instanceof THREE.Mesh){
            child.material = stationMaterial;
        }
    });
    station.scale.set(5,5,5);
    station.position.set(101.079134723125,-0.00000476121003,-167.335362929625)
    station.material = stationMaterial;
    scene.add(station);
    stations.push(station);
}