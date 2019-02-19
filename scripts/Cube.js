function Cube(opts) {
  const geometry = new THREE.SphereBufferGeometry( 1, 32, 32 );//new THREE.CircleBufferGeometry( 1, 32 );//new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: opts.color ? opts.color : 0xffffff,
    side: THREE.DoubleSide,
    // opacity: 0.75,
    // transparent: true
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = opts.position ? opts.position.x : 0;
  cube.position.y = opts.position ? opts.position.y : 0;
  cube.position.z = opts.position ? opts.position.z : 0;
  return cube;
}