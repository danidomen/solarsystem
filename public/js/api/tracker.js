var locatorPoints = [];

function getTrackCoordinates(){

    var iconTexture = new THREE.TextureLoader().load( '/images/Logo_Quantum_Drives.png' );
    var iconMaterial = new THREE.SpriteMaterial( { map: iconTexture } );
    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var dateLog = false;
    var points = [];
    $.post(
        'https://prestademo.danidomen.com/captainlog.php',
        {
            'action': 'get',
            'format': 'tracker'
        },
        function(response){
            response.forEach(location => {
                var dateLogActual = new Date(location.date_add);
                if(!dateLog || (dateLog && !sameDay(dateLog,dateLogActual))){
                    if(dateLog){
                        var geometry = new THREE.BufferGeometry().setFromPoints( points );
                        var line = new THREE.Line( geometry, lineMaterial );
                        scene.add( line );
                    }
                    dateLog = dateLogActual;
                    points = [];
                }

                points.push( new THREE.Vector3(location.lon * reductorCoordinates, location.alt * reductorCoordinates, location.lat * reductorCoordinates));

                var iconSprite = new THREE.Sprite( iconMaterial );
                iconSprite.name = 'locator';
                iconSprite.position.set(location.lon * reductorCoordinates, location.alt * reductorCoordinates, location.lat * reductorCoordinates);
                iconSprite.scale.set(5,5,5);
                iconSprite.cursor = 'pointer';
                iconSprite.isLocator = true;
                locatorPoints.push(iconSprite);
                scene.add( iconSprite );

                iconSprite.addEventListener('mouseover',function(ev){
                    if(!insidePlanet){
                        document.body.style.cursor = 'crosshair';
                    }
                    
                });
                

                iconSprite.addEventListener('dblclick', function(ev) {
                    if(!insidePlanet){
                        controls.target = this.position
                        camera.position = this.position
                        camera.lookAt(this.position);
                        controls.update();
                        cameraFollowTo = this;
                        resizePOV();
                    }
                });

                iconSprite.addEventListener('mouseout', function(ev) {
                    document.body.style.cursor = 'default';
                });
                interactionManager.add(iconSprite);
            });
            
        },
        'json'
    )
}

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
}