"use strict";

// Static components

var hamburger = document.querySelector("header.header-mobile label.mobile-nav");

hamburger.addEventListener("click", function () {
  var bodyClass = document.body.classList;
  if (bodyClass.contains("is-noscroll")) {
    if (bodyClass.contains("nav-active")) bodyClass.remove("nav-active");
  } else {
    if (!bodyClass.contains("nav-active")) bodyClass.add("nav-active");
  }
});

// Dynamic components
var featureImageCardSet = [];
var featureImageWrapSet = [];
var featureImageSet = [];
var activeFeatureImage = [];
var renderFeatureImage = [];

var componentParse = function componentParse() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // Universal components
  featureImageCardSet = [];
  featureImageWrapSet = [];
  featureImageSet = [];
  activeFeatureImage = [];
  renderFeatureImage = [];
  featureImageCardSet = document.querySelectorAll(".feature-set-content-wrap .feature-image.grid");
  for (var i = 0; i < featureImageCardSet.length; i++) {
    // let imageWrap = featureImageCardSet[i].firstChild
    featureImageWrapSet.push(featureImageCardSet[i].firstChild);
    featureImageSet.push(featureImageCardSet[i].firstChild.querySelector('img'));
    activeFeatureImage.push(false);
    renderFeatureImage.push(undefined);
  }
};

componentParse();

var transformFeatureImage = function transformFeatureImage(i) {
  var offsetTop = featureImageCardSet[i].getBoundingClientRect().top;
  var offsetScreen = (offsetTop - window.innerHeight) * -1;

  var progress = offsetScreen / window.innerHeight;
  var wrapTop = featureImageWrapSet[i].offsetTop * -1;
  featureImageSet[i].style["transform"] = "translate(0," + progress * wrapTop + "px)";
  renderFeatureImage[i] = requestAnimationFrame(function () {
    transformFeatureImage(i);
  });
};

var trackFeatureImage = function trackFeatureImage() {
  var _loop = function _loop(i) {
    if (featureImageSet[i]) {
      var offsetTop = featureImageCardSet[i].getBoundingClientRect().top;
      var offsetScreen = (offsetTop - window.innerHeight) * -1;
      var nudge = 120;
      var overScreen = offsetScreen - featureImageCardSet[i].offsetHeight - nudge;

      if (offsetScreen > nudge * -1 && overScreen < window.innerHeight) {
        if (activeFeatureImage[i] == false) {
          activeFeatureImage[i] = true;
          // console.log("+ + FeatureImage", i)
          renderFeatureImage[i] = requestAnimationFrame(function () {
            transformFeatureImage(i);
          });
        }
      } else {
        if (activeFeatureImage[i] == true) {
          activeFeatureImage[i] = false;
          // console.log(" -  FeatureImage", i)
          cancelAnimationFrame(renderFeatureImage[i]);
        }
      }
    }
  };

  for (var i = 0; i < featureImageCardSet.length; i++) {
    _loop(i);
  }
  // featureImagesTransform = requestAnimationFrame(transformFeatureImage)
};

document.addEventListener("scroll", function () {

  trackFeatureImage();
});
//# sourceMappingURL=scripts-dist.js.map