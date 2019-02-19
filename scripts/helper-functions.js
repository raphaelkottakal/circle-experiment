function makePoints(opts) {
  const points = [];
  const count = opts.count ? opts.count : 8;
  const radius = opts.radius ? opts.radius : 10
  const sliceAngle = Math.PI * 2 / count;
  for (let i = 0; i < count; i++) {
    const x = Math.cos(sliceAngle * i) * radius//sliceAngle * i * radius / 2;
    const y = Math.sin(sliceAngle * i) * radius;
    point = new Cube({
      color: 0x00ff00,
      position: new THREE.Vector3(x, y)
    });
    points.push(point);
  }
  return points;
}

function addPointsToScene(points) {
  for (let i = 0; i < points.length; i++) {
    scene.add(points[i]);
  }
}

function setPoitsColor(points, r, g, b) {
  for (let i = 0; i < points.length; i++) {
    points[i].material.color.setRGB(r, g, b);
  }
}

function rotatePoints(points) {
  for (let i = 0; i < points.length; i++) {
    points[i].rotation.x += 0.01 * i / points.length;
    points[i].rotation.y += 0.01;
  }
}