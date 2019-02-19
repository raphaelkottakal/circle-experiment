function Cube(opts) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: opts.color ? opts.color : 0xffffff,
    opacity: 0.75,
    transparent: true
  });
  const cube = new THREE.Mesh(geometry, material);
  // cube.position = opts.position ? opts.position : new THREE.Vector3(0, 0, 0);
  cube.position.x = opts.position ? opts.position.x : 0;
  cube.position.y = opts.position ? opts.position.y : 0;
  cube.position.z = opts.position ? opts.position.z : 0;
  return cube;
}