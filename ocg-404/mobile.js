// if ( location.protocol != "https:" ) {
//   location.href = "https:" + window.location.href.substring( window.location.protocol.length );
// }

let acX, acY, acZ

let accelerator = (data) => {
  acX.innerHTML = data[0].toFixed(2)
  acY.innerHTML = data[1].toFixed(2)
  acZ.innerHTML = data[2].toFixed(2)
}

function permission () {
  if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
    // (optional) Do something before API request prompt.
    DeviceMotionEvent.requestPermission()
      .then( response => {
      // (optional) Do something after API prompt dismissed.
      if ( response == "granted" ) {
        window.addEventListener( "devicemotion", (e) => {
          accelerator([e.accelerationIncludingGravity.x, e.accelerationIncludingGravity.y, e.accelerationIncludingGravity.z]);
        });
      }
    }).catch( console.error );
  } else {
    alert( "DeviceMotionEvent is not defined" );
  }
}

window.onload = function() {
  console.log('Page Loaded');
  acX = document.getElementById("ac_x")
  acY = document.getElementById("ac_y")
  acZ = document.getElementById("ac_z")
  document.body.addEventListener("click", permission);

}