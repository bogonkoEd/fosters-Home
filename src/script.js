import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const fog = new THREE.Fog(0x490056, 2.5, 20);
scene.fog = fog;

//TEXTURES
const textureLoader = new THREE.TextureLoader();

//DOOR TEXTURES
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

//BRICK TEXTURES
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

//GROUND TEXTURES
const groundColorTexture = textureLoader.load("/textures/grass/color.jpg");
const groundAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const groundNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const groundRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

groundColorTexture.repeat.set(4, 4);
groundColorTexture.wrapS = THREE.RepeatWrapping;
groundColorTexture.wrapT = THREE.RepeatWrapping;
groundAmbientOcclusionTexture.repeat.set(4, 4);
groundAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
groundAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
groundNormalTexture.repeat.set(4, 4);
groundNormalTexture.wrapS = THREE.RepeatWrapping;
groundNormalTexture.wrapT = THREE.RepeatWrapping;
groundRoughnessTexture.repeat.set(4, 4);
groundRoughnessTexture.wrapS = THREE.RepeatWrapping;
groundRoughnessTexture.wrapT = THREE.RepeatWrapping;

//HOUSE

const houseGroup = new THREE.Group();
scene.add(houseGroup);

//AXES HELPER
const axesHelper = new THREE.AxesHelper(5);
axesHelper.visible = true;
scene.add(axesHelper);

//WALLS
//Orange Back House
const orangeWall = new THREE.Mesh(
  new THREE.BoxBufferGeometry(3, 4, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ff7f00",
  })
);
orangeWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(orangeWall.geometry.attributes.uv.array, 2)
);
orangeWall.position.set(1.5, 2, 1);
houseGroup.add(orangeWall);

const orangeWallRoof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(2.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ff7f00",
  })
);
orangeWallRoof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    orangeWallRoof.geometry.attributes.uv.array,
    2
  )
);
orangeWallRoof.rotation.y = Math.PI * 0.25;
orangeWallRoof.position.set(1.5, 4.75, 1);
houseGroup.add(orangeWallRoof);

//Orange Front House
const frontOrangeWall = new THREE.Mesh(
  new THREE.BoxBufferGeometry(2, 5, 1),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ff7f00",
  })
);
frontOrangeWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    frontOrangeWall.geometry.attributes.uv.array,
    2
  )
);
frontOrangeWall.position.set(1, 2.5, 2.5);
houseGroup.add(frontOrangeWall);

const frontOrangeWallRoof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(1.65, 3, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ff7f00",
  })
);
frontOrangeWallRoof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    frontOrangeWallRoof.geometry.attributes.uv.array,
    2
  )
);
frontOrangeWallRoof.rotation.y = Math.PI * 0.25;
frontOrangeWallRoof.position.set(1, 6.5, 2.5);
houseGroup.add(frontOrangeWallRoof);

//Front porch
const porch = new THREE.Mesh(
  new THREE.BoxBufferGeometry(2.5, 0.5, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ff7f00",
  })
);
porch.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(porch.geometry.attributes.uv.array, 2)
);
porch.position.set(1, 0.25, 2.5);
houseGroup.add(porch);

//Front Door
const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1.5, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.01,
    metalnessMap: doorMetalnessTexture,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.set(1, 1.25, 3.01); //Z-AXIS is 3.01 to avoid z-fighting
houseGroup.add(door);

const redWall = new THREE.Mesh(
  new THREE.BoxBufferGeometry(2, 4.5, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ff0000",
  })
);

//Front Door Column1
const tower1 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.5, 0.5, 2, 6),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ffff00",
  })
);
tower1.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(tower1.geometry.attributes.uv.array, 2)
);
tower1.position.set(-0.5, 1, 3.75);
houseGroup.add(tower1);

const tower1Roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(0.75, 1.5, 6),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: 0x36281e,
  })
);
tower1Roof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(tower1Roof.geometry.attributes.uv.array, 2)
);
tower1Roof.rotation.y = Math.PI * 0.25;
tower1Roof.position.set(-0.5, 2.75, 3.75);
houseGroup.add(tower1Roof);

//Front Door Column2
const tower2 = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.625, 0.625, 1.5, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ffff00",
  })
);
tower2.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(tower2.geometry.attributes.uv.array, 2)
);
tower2.position.set(2.5, 0.75, 3.75);
houseGroup.add(tower2);

const tower2Roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(0.75, 1.5, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: 0x36281e,
  })
);
tower2Roof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(tower2Roof.geometry.attributes.uv.array, 2)
);
tower2Roof.rotation.y = Math.PI * 0.25;
tower2Roof.position.set(2.5, 2, 3.75);
houseGroup.add(tower2Roof);

//Red Main House
redWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(redWall.geometry.attributes.uv.array, 2)
);
redWall.position.set(-1, 2.25, 1);
houseGroup.add(redWall);

//Yellow Column Rooftop
const yellowColumn = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(1, 1, 3, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: 0x36281e,
  })
);
yellowColumn.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(yellowColumn.geometry.attributes.uv.array, 2)
);
yellowColumn.position.set(-1, 5.25, 1);
houseGroup.add(yellowColumn);

const yellowColumnRoof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(1.25, 2.5, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: 0x36281e,
  })
);
yellowColumnRoof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    yellowColumnRoof.geometry.attributes.uv.array,
    2
  )
);
yellowColumnRoof.position.set(-1, 8, 1);
houseGroup.add(yellowColumnRoof);

//Red Side House
const redSideWall = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.5, 2.5, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ff0000",
  })
);
redSideWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(redSideWall.geometry.attributes.uv.array, 2)
);
redSideWall.position.set(-2.75, 1.25, 1);
houseGroup.add(redSideWall);

//Yellow Side House
const yellowSideWall = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1.45, 1, 2),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: "#ffff00",
  })
);
yellowSideWall.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    yellowSideWall.geometry.attributes.uv.array,
    2
  )
);
yellowSideWall.position.set(-2.725, 3, 1);
houseGroup.add(yellowSideWall);

const yellowSideWallRoof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(1.45, 1, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    color: 0x36281e,
  })
);
yellowSideWallRoof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(
    yellowSideWallRoof.geometry.attributes.uv.array,
    2
  )
);
yellowSideWallRoof.rotation.y = Math.PI * 0.25;
yellowSideWallRoof.position.set(-2.725, 4, 1);
houseGroup.add(yellowSideWallRoof);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: groundColorTexture,
    aoMap: groundAmbientOcclusionTexture,
    normalMap: groundNormalTexture,
    roughnessMap: groundRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// Back wall
const backWall = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20, 10),
  new THREE.MeshStandardMaterial({ color: "#a9c388" })
);
backWall.position.set(0, 5, 0);
scene.add(backWall);

//LIGHTS
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight(0xbad5ff, 0.25);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door light
const doorLight = new THREE.PointLight(0xff7d46, 1, 7);
doorLight.position.set(1, 2.5, 3.1);
houseGroup.add(doorLight);

// Door light helper
const doorLightHelper = new THREE.PointLightHelper(doorLight, 0.2);
doorLightHelper.visible = false;
scene.add(doorLightHelper);

//SIZES
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// CAMERA
// Base camera
const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  0.1,
  60
);
camera.position.x = -3;
camera.position.y = 8;
camera.position.z = 12;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x490056);

//SHADOWS
renderer.shadowMap.enabled = true;

moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;

doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;

floor.receiveShadow = true;
backWall.receiveShadow = true;

redSideWall.castShadow = true;
yellowSideWall.castShadow = true;
yellowSideWallRoof.castShadow = true;
orangeWall.castShadow = true;
orangeWallRoof.castShadow = true;
frontOrangeWall.castShadow = true;
frontOrangeWallRoof.castShadow = true;
tower1.castShadow = true;
tower2.castShadow = true;

//ANIMATION
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
