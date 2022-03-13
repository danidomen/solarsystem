$(document).ready(function () {
    planetCard.hide();
    getTrackCoordinates();
})

$(document).on('click','.locator-point', function(){
    $('#TooltipDemo').click()
    scene.getObjectById($(this).data('icon-id')).centerLink();
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
        resetCameraToCenter();
    }
};