"use strict";

console.info("Juskteez Store 1 Initiated");

var hamburger = document.querySelector("header.header-mobile label.mobile-nav");

hamburger.addEventListener("click", function () {
  var bodyClass = document.body.classList;
  if (bodyClass.contains("is-noscroll")) {
    if (bodyClass.contains("nav-active")) bodyClass.remove("nav-active");
  } else {
    if (!bodyClass.contains("nav-active")) bodyClass.add("nav-active");
  }
});

var featureImageSet = document.querySelectorAll(".feature-set-content-wrap .feature-image.grid");
var windowHeight = window.innerHeight;

document.addEventListener("scroll", function () {
  // let featureImagePos = []
  for (var i = 0; i < featureImageSet.length; i++) {
    var featureImage = featureImageSet[i];
    // let imageHeight  = featureImage.offsetHeight
    var offsetTop = featureImage.getBoundingClientRect().top;
    var offsetScreen = (offsetTop - window.innerHeight) * -1;

    if (offsetScreen > 0) {
      var progress = offsetScreen / window.innerHeight;
      var imageWrap = featureImage.firstChild;
      var wrapTop = imageWrap.offsetTop * -1;
      var image = imageWrap.querySelector('img');
      // if (progress > 1) progress = 1
      image.style["transform"] = "translate3d(0," + progress * wrapTop + "px,0)";
      // featureImagePos.push(progress * wrapTop)
    }
  }
  // if (featureImagePos.length > 0) console.info(featureImagePos)
});
//# sourceMappingURL=scripts-dist.js.map