// circle
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

// sphere
function makeRandomSpherePoint(r) {
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;
  const z = Math.random() * 2 - 1;;
  const vector = new THREE.Vector3(x, y, z).normalize().multiplyScalar(r);
  return new Cube({ color: 'hsl(' + Math.random() * 360 + ', 100%, 50%)', position: vector });
}

function makeSpherePoint(pX, pY, pZ, r) {
  const colorHue = Math.round(points.length / guiValues.maxPoints * 360);
  const x = Math.cos(pX);//Math.random() * 2 - 1;
  const y = Math.sin(pY);//Math.random() * 2 - 1;
  const z = Math.sin(pZ);//Math.random() * 2 - 1;;
  const vector = new THREE.Vector3(x, y, z).normalize().multiplyScalar(r);
  return new Cube({ color: 'hsl(' + colorHue + ', 100%, 50%)', position: vector });
}


function clearPoints(points) {
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    scene.remove(point);
    point.geometry.dispose();
    point.material.dispose();
    point = undefined;
  }
}