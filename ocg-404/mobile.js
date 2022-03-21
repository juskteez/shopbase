// if ( location.protocol != "https:" ) {
//   location.href = "https:" + window.location.href.substring( window.location.protocol.length );
// }

let mobileAcX, mobileAcY, mobileAcZ

let accelerating = (data) => {
  let [acX, acY, acZ] = data
  mobileAcX.innerHTML = acX / 100 * -1
  mobileAcY.innerHTML = acY / 100
  // mobileAcZ.innerHTML = acZ.toFixed(2)
}

let deviceMotionRequesting = () => {
  if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
    // Before API request prompt.
    DeviceMotionEvent.requestPermission()
      .then( response => {
      // After API prompt dismissed.
      if ( response == "granted" ) {
        window.addEventListener( "devicemotion", (e) => {
          accelerating([e.accelerationIncludingGravity.x, e.accelerationIncludingGravity.y, e.accelerationIncludingGravity.z]);
        });
      }
    }).catch( console.error );
  } else {
    // DeviceMotionEvent is not supported
  }
}

window.onload = function() {
  console.log('Page Loaded');
  mobileAcX = document.getElementById("ac_x")
  mobileAcY = document.getElementById("ac_y")
  mobileAcZ = document.getElementById("ac_z")
  document.body.addEventListener("click", deviceMotionRequesting);

}