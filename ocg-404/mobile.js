// if ( location.protocol != "https:" ) {
//   location.href = "https:" + window.location.href.substring( window.location.protocol.length );
// }

let accelerator = (data) => {
  console.log("Accelerating..", data)
}

// if (window.DeviceOrientationEvent) {
//   console.info("DeviceOrientationEvent supported")
//   window.addEventListener("deviceorientation", function (event) {
//       accelerator([event.beta, event.gamma]);
//   }, true);
// } else {
//   console.info("DeviceOrientationEvent not supported")
// }
// if (window.DeviceMotionEvent) {
//   console.info("DeviceMotionEvent supported")
//   window.addEventListener('devicemotion', function (event) {
//       accelerator([event.acceleration.x * 2, event.acceleration.y * 2]);
//   }, true);
// } else {
//   console.info("DeviceMotionEvent not supported, trying MozOrientation")
//   window.addEventListener("MozOrientation", function (orientation) {
//       accelerator([orientation.x * 50, orientation.y * 50]);
//   }, true);
// }

function permission () {
  if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
    // (optional) Do something before API request prompt.
    DeviceMotionEvent.requestPermission()
      .then( response => {
      // (optional) Do something after API prompt dismissed.
      if ( response == "granted" ) {
        window.addEventListener( "devicemotion", (e) => {
          accelerator([e.acceleration.x * 2, e.acceleration.y * 2]);
        });
      }
    }).catch( console.error );
  } else {
    alert( "DeviceMotionEvent is not defined" );
  }
}

window.onload = function() {
  console.log('Page Loaded');

  document.body.addEventListener("click", permission);

}