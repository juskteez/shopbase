let camera, scene, renderer;
let clock;
let last_cameraPositionX;
let frontLight, leftLight, rightLight, topLight,ambientLight, light;
const defaultCameraPosition = new THREE.Vector3( 0.766, 1.392, 1.603 );
const mouse = new THREE.Vector2();
const accelerator = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );

const controls = new THREE.OrbitControls( camera, renderer.domElement );
let motionSensed = false;
let model;
let mobile_AcX, mobile_AcY, mobile_AcZ = 0;
let mobileAcX, mobileAcY, mobileAcZ, mouseX, mouseY;


init();
animate();
render();


function Light() {

    light = new THREE.PointLight(0xffffff);
    // We want it to be very close to our character
    light.position.set(-5,-2,3);
    light.intensity = 0.1;
    scene.add(light);

    const light_helper = new THREE.PointLightHelper( light, 1 );
    scene.add( light_helper );

    topLight = new THREE.SpotLight( 0x005BFF );
    topLight.position.set( 0, 600, 200 );
    topLight.intensity = 10;
    scene.add( topLight );

    // const top_helper = new THREE.SpotLightHelper( topLight, 20 );
    // scene.add( top_helper );

    // ambientLight = new THREE.AmbientLight( 0x005BFF );
    // ambientLight.intensity = 5;
    // scene.add( ambientLight );

}

function onMouseMove( event ) {
    if (!motionSensed) {
        mouse.x = ( event.clientX - windowHalf.x );
        mouse.y = ( event.clientY - windowHalf.y );
        // console.log(event.clientX, event.clientY);
    }
}

function init() {
    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera.position.set(defaultCameraPosition.x,defaultCameraPosition.y,defaultCameraPosition.z);

    scene = new THREE.Scene();

    const loader = new THREE.GLTFLoader().setPath( 'Models/' );
    loader.load( '404.gltf', function ( gltf ) {
        model = gltf;
        scene.add( model.scene );
        //move model down.
        model.scene.position.y = -1;
        //merge light with custom shader
        var uniforms = THREE.UniformsUtils.merge(
            [THREE.UniformsLib['lights'],
            {
                lightIntensity: {type: 'f', value: 1.0},
            }
            ]
        )
        // console.log(uniforms)
        //new custom shader
        var material = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib['lights'],
                {
                    lightIntensity: {type: 'f', value: 0.6},
                    textureSampler: {type: 't', value: null},
                    color1: {
                        value: new THREE.Color(0x005BFF) //top
                        },
                        color2: {
                        value: new THREE.Color(0x00000) //bottom
                        }
                }
            ]),
            vertexShader: vertShader,
            fragmentShader: fracShader,
            //enable light
            lights: true

            });

        model.scene.traverse( function(node) {


            if (node.isMesh){
                if (node.material.name == "side") {
                    // console.log(node.material.name);
                    node.material = material;
                }
            }
        });

        render();
    } );


    // renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // const controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.enabled = false;
    controls.enableDamping = true;
    // controls.dampingFactor = 10.0;
    // controls.autoRotate = true;
    // controls.enableZoom = true;
    // controls.minDistance = 2;
    // controls.maxDistance = 10;
    controls.target.set( 0, 0, - 0.2 );

    controls.update();

    document.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'resize', onWindowResize );

    clock = new THREE.Clock();

    Light();

}

// let accelerator = (data) => {
//     let [acX, acY, acZ] = data
// 	mobile_AcX = acX / 10;
// 	mobile_AcY = acY / 10;
//     // console.log(mobile_AcX, mobile_AcY);
// }

let deviceMotionRequest = () => {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // Before API request prompt.
        DeviceMotionEvent.requestPermission()
        .then( response => {
            // After API prompt dismissed.
            if ( response == "granted" ) {
                motionSensed = true;
                window.addEventListener( "devicemotion", (e) => {
                    accelerator.x = Number(e.acceleration.x * 100);
	                accelerator.y = Number(e.acceleration.y * 100);
                    // accelerator([e.accelerationIncludingGravity.x * 2, e.accelerationIncludingGravity.y * 2, e.accelerationIncludingGravity.z * 1.5]);
                });
            }
        }).catch( console.error );
    } else {
        motionSensed = false;
        // DeviceMotionEvent is not supported
    }
}

function onWindowResize() {

    const width = window.innerWidth;
	const height = window.innerHeight;

    windowHalf.set( width / 2, height / 2 );

    camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
    render();

}

function animate() {

    // console.log(clock.getElapsedTime());
    if (model!= null ) {
        // console.log(model.scene.children[0]);
        model.scene.children[0].position.y = Math.sin(clock.getElapsedTime()*4)*0.05;
        model.scene.children[2].position.y = Math.sin((clock.getElapsedTime()*4)-1)*0.05;
        model.scene.children[1].position.y = Math.sin((clock.getElapsedTime()*4)-2)*0.05;

    }

    if (motionSensed) {
        target.x = ( 1 - accelerator.x ) * 0.001;
        target.y = ( 1 - accelerator.y ) * 0.001;
        // mobileAcX.innerHTML = target.x;
        // mobileAcY.innerHTML = target.y;
        controls.target.set( target.x, target.y, -0.2 );
        mobileAcZ.innerHTML = "controls.target.set( "+target.x+", "+target.y+", -0.2 );";
        // console.log()
    } else {
        target.x = ( 1 - mouse.x ) * 0.001;
        target.y = ( 1 - mouse.y ) * 0.001;
        controls.target.set( target.x, target.y, - 0.2 );
        if (mobileAcZ) {
            mobileAcZ.innerHTML = "controls.target.set( "+mouse.x+", "+mouse.y+", -0.2 );"
        }
        // controls.target.set( 0, 0, -0.2 );
    }

    // controls.target.set( target.x, target.y, - 0.2 );
    controls.update();
    requestAnimationFrame( animate );
    render();
}


function render() {
    renderer.render( scene, camera );
}


window.onload = function() {
    console.log('Page Loaded');
    mobileAcX = document.getElementById("ac_x")
    mobileAcY = document.getElementById("ac_y")
    mobileAcZ = document.getElementById("ac_z")
    mouseX = document.getElementById("m_x")
    mouseY = document.getElementById("m_y")
    document.body.addEventListener("click", deviceMotionRequest);
}