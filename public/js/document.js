$(document).ready(function () {
    planetCard.hide();
    getTrackCoordinates();
})

//RESET CAMERA AND RESET FOLLOW ITEM
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {    
        cameraFollowTo = null;
        scene.add(camera);
        controls.reset();
        camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z);
        resizePOV();
    }
};