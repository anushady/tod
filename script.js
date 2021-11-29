// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// GLTF Loader

var loader = new THREE.GLTFLoader();
var obj;
loader.load(
	// resource URL
	'sample10.glb',
	// called when the resource is loaded
	    function ( gltf ) {
        obj = gltf.scene
		scene.add( obj );
        obj.scale.set(2.4,2.4,2.4)
        //obj.rotation.set(0.3,0.8,-0.2)
        
        mixer1 = new THREE.AnimationMixer(obj);
	    console.log(gltf.animations)
	    mixer1.clipAction( gltf.animations[0]).play();
        
    }
);

// Lights
const light = new THREE.AmbientLight( 0xffffff,2); // soft white light
scene.add( light );



const pointLight2 = new THREE.PointLight(0xaaaaaa,1)
pointLight2.position.x = 0
pointLight2.position.y = 0
pointLight2.position.z = 9
scene.add(pointLight2)
// const pointLight3 = new THREE.PointLight(0xaaaaaa,2)
// pointLight3.position.x = 0
// pointLight3.position.y = 0
// pointLight3.position.z = -5
// scene.add(pointLight3)

const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
scene.add( directionalLight );
directionalLight.position.set(-1,1,1)


// const pointLight1 = new THREE.PointLight(0xffffff,1)
// pointLight1.position.x = -3
// pointLight1.position.y = 3
// pointLight1.position.z = 1
// scene.add(pointLight1)

// const pointLight3 = new THREE.PointLight(0xffffff,2)
// pointLight3.position.x = -3
// pointLight3.position.y = 1
// pointLight3.position.z = 1
// scene.add(pointLight3)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

//Controls
// const controls = new THREE.OrbitControls(camera, canvas)
// controls.enableDamping = true
// controls.enableZoom = false
// controls.keys = {
// 	LEFT: 'ArrowLeft', //left arrow
// 	UP: 'ArrowUp', // up arrow
// 	RIGHT: 'ArrowRight', // right arrow
// 	BOTTOM: 'ArrowDown' // down arrow
// }

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

 document.addEventListener('mousemove', onDocumentMouseMove)

 let mouseX = 0;
 let mouseY = 0;
 let mouseZ = 0;
 
 let targetX = 0;
 let targetY = 0;
 let targetZ = 0;
 
 const windowX = window.innerWidth /2;
 const windowY = window.innerHeight /2;
 
 function onDocumentMouseMove (event) {
     mouseX = (event.clientX - windowX)
     mouseY = (event.clientY - windowY)
 }
 
 const updateOnScroll = (event) => {
     obj.position.z = window.scrollY *.002
 }
 
 window.addEventListener('scroll', updateOnScroll)

const clock = new THREE.Clock()

const tick = () =>
{
    window.requestAnimationFrame(tick)
    const deltaTime = clock.getDelta()
    if ( mixer1 ) mixer1.update( deltaTime);	
	

   
    targetX = mouseX * .0005
    targetY = mouseY * .0005
    //targetZ = mouseZ * .0005

    //Update objects
    obj.rotation.y += .05 * (targetX - obj.rotation.y)
    obj.rotation.x += .005 * (targetY - obj.rotation.x)
    //obj.rotation.z += -0.05 * (targetY - obj.rotation.z)

    // Update Orbital Controls
    //controls.update()
    renderer.render(scene, camera);	

    // Call tick again on the next frame
    

   
}

tick()