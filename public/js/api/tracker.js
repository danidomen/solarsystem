var locatorPoints = [];
var locatorLines = [];

function getTrackCoordinates(){

    var iconTexture = new THREE.TextureLoader().load( '/images/Logo_Quantum_Drives.png' );
    var iconMaterial = new THREE.SpriteMaterial( { map: iconTexture } );
    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var dateLog = false;
    var points = [];
    var icons = [];
    $.post(
        'https://prestademo.danidomen.com/captainlog.php',
        {
            'action': 'get',
            'format': 'tracker'
        },
        function(response){
            response.forEach((location,key) => {
                var dateLogActual = new Date(location.date_add);
                if(!dateLog){
                    dateLog = dateLogActual;
                }
                if(!sameDay(dateLog,dateLogActual) || response.length == key + 1){
                    
                    var geometry = new THREE.BufferGeometry().setFromPoints( points );
                    var line = new THREE.Line( geometry, lineMaterial );
                    line.travelDate = dateLog.getFullYear()+'-'+dateLog.getMonth().toString().padStart(2,'0')+'-'+dateLog.getDate().toString().padStart(2,'0');
                    scene.add( line );
                    generateCardRoute(line.travelDate, icons);
                    dateLog = dateLogActual;
                    points = [];
                    icons = [];
                    
                }

                points.push( new THREE.Vector3(location.lon * reductorCoordinates, location.alt * reductorCoordinates, location.lat * reductorCoordinates));

                var iconSprite = new THREE.Sprite( iconMaterial );
                iconSprite.name = 'locator';
                iconSprite.position.set(location.lon * reductorCoordinates, location.alt * reductorCoordinates, location.lat * reductorCoordinates);
                iconSprite.scale.set(5,5,5);
                iconSprite.cursor = 'pointer';
                iconSprite.isLocator = true;
                iconSprite.locatorDate = dateLog.getFullYear()+'-'+dateLog.getMonth().toString().padStart(2,'0')+'-'+dateLog.getDate().toString().padStart(2,'0');
                iconSprite.locatorTime = dateLogActual.getHours().toString().padStart(2,'0')+':'+dateLogActual.getMinutes().toString().padStart(2,'0')+':'+dateLogActual.getSeconds().toString().padStart(2,'0');
                locatorPoints.push(iconSprite);
                scene.add( iconSprite );

                iconSprite.centerLink = function(){
                    if(!insidePlanet){
                        centerToObjectAndZoom(this);
                    }
                }

                iconSprite.addEventListener('mouseover',function(ev){
                    if(!insidePlanet){
                        document.body.style.cursor = 'crosshair';
                    }
                    
                });

                iconSprite.addEventListener('dblclick', function(ev) {
                    this.centerLink();
                }); 

                iconSprite.addEventListener('mouseout', function(ev) {
                    document.body.style.cursor = 'default';
                });
                icons.push(iconSprite);
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

function generateCardRoute(day, icons){
    var iconsHTML = '';

    icons.forEach(icon => {
        iconsHTML+= generateCardRoutePoint(icon);
    })
    var cardHTML = (`
        <div class="route-card mb-2 card">
            <div class="card-body">
                <span data-toggle="collapse" href="#route${day}" class="title"  aria-expanded="false">${day} <span class="badge badge-pill badge-warning">${icons.length}</span></span>
                <div class="collapse route-card-content" id="route${day}">
                    ${iconsHTML}
                </div>
            </div>
        </div>`
    );


    $('#tab-routes').append(cardHTML);
}

function generateCardRoutePoint(icon){
    var iconHTML = (`
    <div class="row mb-1" data-icon-id="${icon.id}">
        <div class="col-2 locator-point">
        ${icon.locatorTime}
        </div>
        <div class="col-4">
            <select class="form-control-sm form-control">
                <option>-- Select category --</option>
                <option><i class="las la-gem"></i> Mining</option>
            </select>
        </div>
    </div>
    `);
    return iconHTML
}