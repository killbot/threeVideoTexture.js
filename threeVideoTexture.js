var camera, scene, renderer, 
    geometry, material, mesh,
    vid, vidCanvas, vidContext,
    vidTexture, points, img,
    fpsControls, clock, stats;
init();
animate();

function init(){
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    vid = document.getElementById('kittyVid');
    vidCanvas = document.createElement('canvas');
    vidContext = vidCanvas.getContext('2d');
    vidCanvas.height = 200;
    vidCanvas.width = 200;
    vidTexture = new THREE.Texture(vidCanvas);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3500;
    scene.add(camera);

    //camera.position.z = 3500;
    //camera.lookAt(scene.position);
    //fpsControls = new THREE.FirstPersonControls(camera);
    fpsControls = new THREE.FlyControls(camera);
    fpsControls.movementSpeed = 300;
    //fpsControls.lookSpeed = 0.1;
    fpsControls.rollSpeed=1.0;
    console.log(fpsControls.target);

    //camera.position.z = 3500;
    //camera.position.y = 3500;
    //camera.position.x = 3500;

    //document.addEventListener('mousemove', onMouseMove, false);
    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshLambertMaterial( {color: 0xff0000});

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var pointLight = new THREE.PointLight( 0xFFFFFF );
    pointLight.position = {x: 10, y:50, z: 130};
    scene.add(pointLight);
    makeStars(2000);
    //renderer = new THREE.CanvasRenderer({canvas:document.getElementById('canvas3d'), antialias:true});
    renderer = new THREE.WebGLRenderer({canvas:document.getElementById('canvas3d'), antialias:true});
    renderer.setSize(window.innerWidth-30, window.innerHeight-50);
    //renderer.domElement = document.getElementById('canvas3d');
    //document.body.appendChild( renderer.domElement);
    //fpsControls.object.translateZ(500);
    //fpsControls.object.lookAt(new THREE.Vector3(0,0,0));

};

window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback, element){
        window.setTimeout(callback, 1000/60);
    };
}) ();

function animate(){
    setTimeout(animate, 1000/60);
    render();
    //window.requestAnimationFrame(animate);
}

function render(){
    mesh.rotation.x +=0.01;
    mesh.rotation.y +=0.02;
    updateCamera();
    stats.update();
    vidContext.drawImage(vid, 0, 0, vidCanvas.width, vidCanvas.height);
    fpsControls.update(clock.getDelta());
    if (vidTexture) vidTexture.needsUpdate = true;
    renderer.render(scene,camera);
}

function updateCamera(){

}

function onMouseMove(){

}

function makeStars(starCount){
    var starMaterial = new THREE.ParticleBasicMaterial(
        //{vertexColors: true, size: 100}
        {size: 200, map: vidTexture, overdraw:true}
    );
    //var starMaterial = new THREE.ParticleDOMMaterial(vidCanvas);
    var starGeometry = new THREE.Geometry();
    for (var i=0; i<starCount; i++){
        //var x = Math.random()*window.innerWidth-window.innerWidth/2;
        var x = randomRange(-1000, 1000);
        //var y = Math.random()*window.innerHeight-window.innerHeight/2;
        var y = randomRange(-1000, 1000);
        var z = randomRange(-3000, 3000);
        var r = randomRange(50, 250);
        var g = randomRange(50, 250);
        var b = randomRange(50, 250);
        starGeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x,y,z)));
        //starGeometry.colors.push(new THREE.Color().setRGB(0, 0, 0));

    }
    points = new THREE.ParticleSystem(starGeometry, starMaterial);
    scene.add(points);
    
    starMaterial = new THREE.ParticleBasicMaterial({
                        size:3,
                        color: 0xFF52D1,
                        transparent: true,
                        blending: THREE.AdditiveBlending
                        });
    starGeometry = new THREE.Geometry();
    for (var j = 0; j < 10000; j++){
        starGeometry.vertices.push(
            new THREE.Vertex(new THREE.Vector3(
                randomRange(-5000, 5000),
                randomRange(-5000, 5000),
                randomRange(-5000, 5000)
            ))
        );
    }
    points = new THREE.ParticleSystem(starGeometry, starMaterial);
    scene.add(points);

}

function drawVideoToCanvas(){
    vidContext.drawImage(vid,0,0,vidCanvas.width, vidCanvas.height);
}

function randomRange(low, high){
    return Math.random()*(high-low)+low;
}

