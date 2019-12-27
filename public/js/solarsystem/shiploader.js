var shipMeshes = [];
var loader = new THREE.OBJLoader();

function loadSCModel(modelName) {
    loader.load(
        // resource URL
        `models/${modelName}.obj`,
        // called when resource is loaded
        function(object) {
            object.traverse(function(node) {
                if (node.material) {
                    node.material.side = THREE.DoubleSide;
                }
            });
            object.scale.set(0.00001, 0.00001, 0.00001)
            shipMeshes.push(object)
        },
        // called when loading is in progresses
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function(error) {
            console.log('An error happened');
        }
    );
}

loadSCModel('Aegis_Sabre');
loadSCModel('MISC_Freelancer_MAX');
loadSCModel('RSI_Constellation_Aquila');