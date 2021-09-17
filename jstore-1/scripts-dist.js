'use strict';

// Mutation object creation

var mutationNode = document.getElementsByTagName('TITLE')[0];
var mutationConfig = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var mutationCallback = function mutationCallback(mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var mutation = _step.value;

      if (mutation.type === 'childList') {
        //console.log('A child node has been added or removed.');
        initation(true);
      } else if (mutation.type === 'attributes') {
        //console.log('The ' + mutation.attributeName + ' attribute was modified.');
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(mutationCallback);

// Dynamic components
var featureImageCardSet = [];
var featureImageWrapSet = [];
var featureImageSet = [];
var activeFeatureImage = [];
var renderFeatureImage = [];

var componentParse = function componentParse(reinit) {
  // Universal components
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

// Initation process
var initation = function initation(reinit) {
  componentParse(reinit);
};

// Initation on page loaded
window.onload = function () {
  initation();
};

// Begin detect page changes
observer.observe(mutationNode, mutationConfig);

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

// Dynamic methods

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
      var offsetScreen = (featureImageCardSet[i].getBoundingClientRect().top - window.innerHeight) * -1;
      var nudge = 200;
      var overScreen = offsetScreen - featureImageCardSet[i].offsetHeight - nudge;

      if (offsetScreen > nudge * -1 && overScreen < window.innerHeight) {
        if (activeFeatureImage[i] == false) {
          activeFeatureImage[i] = true;
          renderFeatureImage[i] = requestAnimationFrame(function () {
            transformFeatureImage(i);
          });
        }
      } else {
        if (activeFeatureImage[i] == true) {
          activeFeatureImage[i] = false;
          cancelAnimationFrame(renderFeatureImage[i]);
        }
      }
    }
  };

  for (var i = 0; i < featureImageCardSet.length; i++) {
    _loop(i);
  }
};

document.addEventListener("scroll", function () {

  trackFeatureImage();
});
//# sourceMappingURL=scripts-dist.js.map