var starColor = (function () {
    var colors = [0xFFFF00, 0x559999, 0xFF6339, 0xFFFFFF];
    return colors[Math.floor(Math.random() * colors.length)];
})(),
    size = 10 + Math.random() * 7,
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