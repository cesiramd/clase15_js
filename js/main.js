$( document ). ready( function(){

  let mouse = new THREE.Vector2(-1000, -1000);
//escena
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );
//camara
  scene.add( camera );
  camera.position.z = 6;
//luz
  let light = new THREE.PointLight( 0xfffff, 1, 100 );
  light.position.set( 0, 0, camera.position.z );
  scene.add( light );

  let geometry = new THREE.IcosahedronGeometry( 2, 1 );
  let material = new THREE.MeshLambertMaterial({ color: 0xC9227E, flatShading: true });
  geometry.computeFlatVertexNormals();
  let ico = new THREE.Mesh( geometry, material );
//  scene.add ( ico );

  let contenedorDibujo = new THREE.Object3D();
  scene.add( contenedorDibujo );

  function animate(){
    requestAnimationFrame( animate );
    ico.rotation.y += 0.005;
    renderer.render( scene, camera );
  }
    animate();

let isPressed = false;

      $( window ).on( 'mousemove', function( e ){
          mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      	  mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
          camera.position.x = mouse.x * 2;
          camera.position.y = mouse.y * 2;
          light.position.x = mouse.x * 2;
          light.position.y = mouse.y * 2;
          camera.lookAt( 0, 0, 0 );

          if (isPressed){
              let geometry = new THREE.BoxGeometry( ( Math.abs( mouse.x) * 0.3) + 0.2, ( Math.abs( mouse.y) * 0.3) + 0.2 , 0.5);
              let color = new THREE.Color("rgb(255, 100, 255)");
              let material = new THREE.MeshLambertMaterial({ color: color });
              let circulo = new THREE.Mesh(geometry, material) ;

              let geometry2 = new THREE.BoxGeometry( ( Math.abs( mouse.x) * 0.3) + 0.1, ( Math.abs( mouse.y) * 0.3) + 0.1 , 0.6 );
              let color2 = new THREE.Color("rgb(100, 255, 255)");
              let material2 = new THREE.MeshLambertMaterial({ color: color2 });
              let circulo2 = new THREE.Mesh(geometry2, material2) ;

              var vector = new THREE.Vector3( mouse.x, mouse.y,  0.0);
              vector.unproject( camera );
              var dir = vector.sub( camera.position ).normalize();
              var distance = - camera.position.z / dir.z;
              var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
              circulo.position.copy( pos );
              circulo2.position.copy( pos );

              contenedorDibujo.add( circulo );
              contenedorDibujo.add( circulo2 );
            }

      });

      $( window ).on( 'mousedown', function( e ){
          isPressed = true;

      });

      $( window ).on( 'mouseup', function( e ){
          isPressed = false;

      });

}); // document ready
