var glows = [];
var star = null;
var bgStars = [];
var cameraFollowTo = null;

function createStar() {
    var starColor = (function() {
            //var colors = [0xFFFF00, 0x559999, 0xFF6339, 0xFFFFFF];
            colors = [0xFFFF00];
            return colors[Math.floor(Math.random() * colors.length)];
        })(),
        size = 10 + Math.random() * 7;

    star = new THREE.Mesh(
        new THREE.SphereGeometry(size, 20, 20),
        new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
        })
    );
    star.castShadow = false;
    scene.add(star);

    for (var i = 1, scaleX = 1.1, scaleY = 1.1, scaleZ = 1.1; i < 5; i++) {
        var starGlow = new THREE.Mesh(
            new THREE.SphereGeometry(7, 15, 15),
            new THREE.MeshBasicMaterial({
                color: starColor,
                transparent: true,
                opacity: 0.5
            })
        );
        starGlow.castShadow = false;
        scaleX += 0.4 + Math.random() * .5;
        scaleY += 0.4 + Math.random() * .5;
        scaleZ += 0.4 + Math.random() * .5;
        starGlow.scale.set(scaleX, scaleY, scaleZ);
        starGlow.origScale = {
            x: scaleX,
            y: scaleY,
            z: scaleZ
        };
        glows.push(starGlow);
        scene.add(starGlow);
    }



    //Lights
    var light1 = new THREE.PointLight(starColor, 2, 0, 0);

    light1.position.set(0, 0, 0);
    scene.add(light1);

    var light2 = new THREE.AmbientLight(0xFFFFFF, 0.8);
    scene.add(light2);
}

function starRotation(t) {
    star.rotation.set(0, t, 0);
    for (var g in glows) {
        var glow = glows[g];
        glow.scale.set(
            Math.max(glow.origScale.x - .2, Math.min(glow.origScale.x + .2, glow.scale.x + (Math.random() > .5 ? 0.005 : -0.005))),
            Math.max(glow.origScale.y - .2, Math.min(glow.origScale.y + .2, glow.scale.y + (Math.random() > .5 ? 0.005 : -0.005))),
            Math.max(glow.origScale.z - .2, Math.min(glow.origScale.z + .2, glow.scale.z + (Math.random() > .5 ? 0.005 : -0.005)))
        );
        glow.rotation.set(0, t, 0);
    }
}

function createBgStars() {
    for (var i = 0; i < 500; i++) {
        var tw = {
            x: Math.random(),
            y: Math.random()
        }

        bgStars.push(tw);
    }
}

function animateBgStars() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';

    for (var s in bgStars) {
        var q = bgStars[s],
            oX = q.x * ctx.canvas.width,
            oY = q.y * ctx.canvas.height,
            size = Math.random() < .9998 ? Math.random() : Math.random() * 3;

        ctx.beginPath();
        ctx.moveTo(oX, oY - size);
        ctx.lineTo(oX + size, oY);
        ctx.lineTo(oX, oY + size);
        ctx.lineTo(oX - size, oY);
        ctx.closePath();
        ctx.fill();
    }
}