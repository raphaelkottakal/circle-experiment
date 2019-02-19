// global constants
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const gui = new dat.GUI();
const guiValues = new makeGuiValues();
stats = new Stats();

// create elements
const camControls = new THREE.OrbitControls( camera );
const ambientLight = new THREE.AmbientLight( 0x404040 );
const light = new THREE.DirectionalLight(0xffffff, 0.75);
const cube = new Cube({ color: 0x00ff00 });
// const points = makePoints({
//   count: 6,
//   radius: 64
// });
const points = [];
setInterval(function() {
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;
  const z = Math.random() * 2 - 1;;
  const vector = new THREE.Vector3(x, y, z).normalize().multiplyScalar(32);
  const point = new Cube({ color: 0xff0000, position: vector });
  point.lookAt(scene.position);
  points.push(point);
  scene.add(point);
  // console.log(point.position, Math.round(vector.length()));

}, 10);

// config
stats.showPanel(0);
gui.close();
gui.add(guiValues, 'addHelpers');
gui.add(guiValues, 'orbitCam');
gui.addColor(guiValues, 'color');
// camera
camControls.enableDamping = true;
camControls.enabled = false;
camera.position.z = 128;
// light
light.position.x = 16;
light.position.y = 16;
light.position.z = 16;
// renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// add lighting
scene.add(light);
scene.add(ambientLight);
addPointsToScene(points);

// add meshes to scene
// scene.add(cube);

// animation
function animate() {
  stats.begin();
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // makeCirclePoints(500);
  // rotatePoints(points);
  // console.log(points);
  setFromGui();
  camControls.update();
  stats.end();
	renderer.render(scene, camera);
}

animate();

// add renderer to dom
document.body.appendChild( stats.dom );
document.body.appendChild(renderer.domElement);
window.onresize = onResize;

// gui functions 
function setFromGui() {
  const color = new THREE.Color(guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
  if (!cube.material.color.equals(color)) {
    cube.material.color.setRGB(guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
    setPoitsColor(points, guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
  }
  if (camControls.enabled !== guiValues.orbitCam) {
    camControls.enabled = guiValues.orbitCam;
  }
}

function makeGuiValues() {
  this.color = [ 0, 255, 0 ];
  this.orbitCam = true;
  this.addHelpers = addHelpers;
};

function addHelpers() {
  const lightHelper = new THREE.DirectionalLightHelper(light, 4);
  scene.add(lightHelper);
}

// other functions
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}