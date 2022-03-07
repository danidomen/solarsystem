var shipMeshes = [];
var meshesDAE = [];
var loaderOBJ = new THREE.OBJLoader();
var loaderDAE = new THREE.ColladaLoader();

function loadOBJModel(modelName) {
    loaderOBJ.load(
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

function loadDAEModel(modelName){
    loaderDAE.load(
        // resource URL
        `models/${modelName}.dae`,
        // called when resource is loaded
        function(data) {
            data.scene.traverse(function(node) {
                if (node.material) {
                    node.material.side = THREE.DoubleSide;
                }
            });
            data.scene.scale.set(1, 1, 1)
            data.scene.updateMatrix();
            meshesDAE.push(data.scene)
            addStation('aaa');
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

loadDAEModel('StationBravo');
loadOBJModel('Aegis_Sabre');
loadOBJModel('MISC_Freelancer_MAX');
loadOBJModel('RSI_Constellation_Aquila');