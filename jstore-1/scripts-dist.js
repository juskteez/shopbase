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
  var featureImagePos = [];
  for (var i = 0; i < featureImageSet.length; i++) {
    var featureImage = featureImageSet[i];
    var imageHeight = featureImage.offsetHeight;
    var offsetTop = featureImage.getBoundingClientRect().top;
    var offsetScreen = offsetTop - windowHeight;
    featureImagePos.push(offsetScreen);
  }
  // console.info(featureImagePos)
});
//# sourceMappingURL=scripts-dist.js.map