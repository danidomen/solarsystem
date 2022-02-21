$(document).ready(function () {
    planetCard.hide();
    getTrackCoordinates();
})
function resize() {
    var ratio = 16 / 9,
        preHeight = documentContainer.clientWidth / ratio;


    if (preHeight <= documentContainer.clientHeight) {
        renderer.setSize(documentContainer.clientWidth, preHeight);
        ctx.canvas.width = documentContainer.clientWidth;
        ctx.canvas.height = preHeight;
    } else {
        var newWidth = Math.floor(documentContainer.clientWidth - (preHeight - documentContainer.clientHeight) * ratio);
        newWidth -= newWidth % 2 !== 0 ? 1 : 0;
        renderer.setSize(newWidth, newWidth / ratio);
        ctx.canvas.width = newWidth;
        ctx.canvas.height = newWidth / ratio;
    }

    renderer.domElement.style.width = '';
    renderer.domElement.style.height = '';
    renderer.domElement.style.left = ctx.canvas.style.left = (documentContainer.clientWidth - renderer.domElement.width) / 2 + 'px';
    renderer.domElement.style.top = ctx.canvas.style.top = (documentContainer.clientHeight - renderer.domElement.height) / 2 + 'px';
}
window.addEventListener('resize', resize);

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
        if(camera.parent?.scale){
            camera.parent.scale.set(1,1,1);
        }
        cameraFollowTo = null;
        scene.add(camera);
        controls.reset();
        camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z);
    }
};

resize();