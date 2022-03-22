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
let nudger = 0;


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
    }
}

function init() {
    const container = document.getElementById("container_404");
    container.classList.add("backdrop_container");

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

        if (window.innerWidth < 1024) {
            camera.zoom = 0.72;
            nudger = 0.4;
        } else {
            camera.zoom = 1;
            nudger = 0;
        }
        camera.updateProjectionMatrix();

        render();
    } );


    // renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.id = "backdrop_404"
    renderer.domElement.classList.add("backdrop_canvas")
    container.appendChild( renderer.domElement );

    // const controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.enabled = false;
    controls.enableDamping = true;
    controls.target.set( 0, 0, - 0.2 );

    controls.update();

    document.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'resize', onWindowResize );

    clock = new THREE.Clock();

    Light();

}

let deviceMotionRequest = () => {
    if ( typeof( window.DeviceMotionEvent ) !== "undefined" && typeof( window.DeviceMotionEvent.requestPermission ) === "function" ) {
        // Before API request prompt.
        window.DeviceMotionEvent.requestPermission()
        .then( response => {
            // After API prompt dismissed.
            if ( response == "granted" ) {
                motionSensed = true;
                window.addEventListener( "deviceorientation", (e) => {
                    accelerator.x = Number(e.gamma / 96);
	                accelerator.y = Number(e.beta / 128);
                });
            }
        }).catch( console.error );
    } else {
        if (window.DeviceMotionEvent) {
            motionSensed = true;
            window.addEventListener( "deviceorientation", (e) => {
                accelerator.x = Number(e.gamma / 96);
                accelerator.y = Number(e.beta / 128);
            });
        } else {motionSensed = false;}
        // DeviceMotionEvent is not supported
    }
}

function onWindowResize() {

    const width = window.innerWidth;
	const height = window.innerHeight;

    windowHalf.set( width / 2, height / 2 );

    if (width < 1024) {
        camera.zoom = 0.72;
        nudger = 0.4;
    } else {
        camera.zoom = 1;
        nudger = 0;
    }
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
        target.x = accelerator.x;
        target.y = nudger + accelerator.y;
    } else {
        target.x = ( 1 - mouse.x ) * 0.001;
        target.y = nudger + ( 1 - mouse.y ) * 0.001;
    }

    controls.target.set( target.x, target.y, - 0.2 );
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