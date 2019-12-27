$(document).ready(function() {
    planetCard.hide();

    $('#addQuanta').on('click', function() {
        var quantaNumber = $('#quantaNumber').val();
        if (quantas.length >= 2000) {
            quantaNumber = 10;
            alert('You have so many quantas! This can cause slow your browser. Limited to add 10 more on this action.');
        }
        addBatchQuantas(quantaNumber);
    })

    $('#eraseQuanta').on('click', function() {
        var quantaToErase = $('#quantaNumber').val();
        if (quantas.length < quantaToErase) {
            quantaToErase = quantas.length;
            alert('You dont have this number of quanta. Erasing the remainings quantas');
        }
        clearQuantas(quantaToErase);
    })
})

function resize() {
    var ratio = 16 / 9,
        preHeight = window.innerWidth / ratio;

    if (preHeight <= window.innerHeight) {
        renderer.setSize(window.innerWidth, preHeight);
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = preHeight;
    } else {
        var newWidth = Math.floor(window.innerWidth - (preHeight - window.innerHeight) * ratio);
        newWidth -= newWidth % 2 !== 0 ? 1 : 0;
        renderer.setSize(newWidth, newWidth / ratio);
        ctx.canvas.width = newWidth;
        ctx.canvas.height = newWidth / ratio;
    }

    renderer.domElement.style.width = '';
    renderer.domElement.style.height = '';
    renderer.domElement.style.left = ctx.canvas.style.left = (window.innerWidth - renderer.domElement.width) / 2 + 'px';
    renderer.domElement.style.top = ctx.canvas.style.top = (window.innerHeight - renderer.domElement.height) / 2 + 'px';
}

window.addEventListener('resize', resize);

resize();