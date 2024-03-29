'use strict';

// Mutation object creation

var mutationNode = document.getElementsByTagName('TITLE')[0];
var mutationConfig = { attributes: true, childList: true, subtree: true

  // Callback function to execute when mutations are observed
};var mutationCallback = function mutationCallback(mutationsList, observer) {
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
        setTimeout(initation, 2000);
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
var pageBody = false;
var featureImageCardSet = [];
var featureImageWrapSet = [];
var featureImageSet = [];
var activeFeatureImage = [];
var renderFeatureImage = [];
var searchTrigger = false;
var searchServed = false;
var hamburger = false;
var hamburgerServed = false;
var singleHamburger = false;
var shamburgerServed = false;
var announceBar = false;
var announceBarServed = false;
var awkwardLoad = false;

var clickServe = function clickServe(element, trigger, callback) {
  if (element) {
    if (trigger == false) {
      element.addEventListener("click", callback);
      return true;
    } else {
      return true;
    }
  }
  return false;
};
var loadServe = function loadServe(elements, trigger, callback) {
  if (elements) {
    if (trigger == false) {
      return callback(elements);
    } else {
      return true;
    }
  }
  return false;
};

var componentParse = function componentParse(reinit) {
  if (awkwardLoad) {
    mutationNode = document.getElementsByTagName('TITLE')[0];
    if (mutationNode) {
      observer.disconnect();
      observer.observe(mutationNode, mutationConfig);
      awkwardLoad = false;
    } else {
      awkwardLoad = true;
    }
  }
  // Universal components
  pageBody = document.querySelector(".default-layout > main.main-content") || false;
  // pageBody  = storeBody.firstChild

  var shamburgerSelector = "header.header .main-nav-wrapper .nav a.hamburger";
  var nav = document.querySelector("header.header .main-nav-wrapper .nav");
  if (nav) {
    if (!document.querySelector(shamburgerSelector)) {
      singleHamburger = document.createElement("A");
      singleHamburger.setAttribute("href", "javascript:;");
      singleHamburger.classList.add("hamburger");
      nav.prepend(singleHamburger);
    }
  }

  searchTrigger = document.querySelector('header.header-mobile .header-wrap a.search-icon');
  hamburger = document.querySelector("header.header-mobile label.mobile-nav");
  searchServed = clickServe(searchTrigger, searchServed, searchClick);
  hamburgerServed = clickServe(hamburger, hamburgerServed, hamburgerTrigger);
  shamburgerServed = clickServe(singleHamburger, shamburgerServed, shamburgerTrigger);
  announceBar = document.querySelectorAll("header .promo_banner");
  announceBarServed = loadServe(announceBar, announceBarServed, announceBarShow);

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

  var footer_links = document.querySelectorAll('.footer_link a[href*="/policies/"]');
  for (var n = 0; n < footer_links.length; n++) {
    var link_text = footer_links[n].textContent;

    if (link_text.includes(" policy")) {
      footer_links[n].setAttribute("replace-text", link_text.replace(" policy", ""));
    }
  }

  if (pageBody instanceof Element) {
    if (pageBody.firstChild) {
      if (pageBody.firstChild.classList.contains("product-template")) {
        if (!document.body.classList.contains("product-details-page")) document.body.classList.add("product-details-page");
      } else {
        if (document.body.classList.contains("product-details-page")) document.body.classList.remove("product-details-page");
      }
    } else {
      if (document.body.classList.contains("product-details-page")) document.body.classList.remove("product-details-page");
    }
  }
};

// Initation process
var initation = function initation() {
  var reinit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  componentParse(reinit);
};

// Begin detect page changes
if (mutationNode) {
  observer.observe(mutationNode, mutationConfig);
} else {
  // Initation on page loaded
  awkwardLoad = true;
  var bodyTemp = document.querySelector("#app");
  var cfgTemp = { attributes: true, childList: true, subtree: false };
  observer.observe(bodyTemp, cfgTemp);
}

// Static components
var hamburgerTrigger = function hamburgerTrigger() {
  var bodyClass = document.body.classList;
  if (bodyClass.contains("is-noscroll")) {
    if (!bodyClass.contains("nav-active")) bodyClass.add("nav-active");
  } else {
    if (bodyClass.contains("nav-active")) bodyClass.remove("nav-active");
  }
};

var shamburgerTrigger = function shamburgerTrigger() {
  var bodyClass = document.body.classList;
  if (!bodyClass.contains("nav-active")) {
    bodyClass.add("nav-active");
    if (!bodyClass.contains("is-noscroll")) bodyClass.add("is-noscroll");
  } else {
    bodyClass.remove("nav-active");
    if (bodyClass.contains("is-noscroll")) bodyClass.remove("is-noscroll");
  }
};

var multiString = function multiString(string) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (times > 0) {
    return string + multiString(string, times - 1);
  } else {
    return "";
  }
};

var announceBarShow = function announceBarShow(bars) {
  for (var i = 0; i < bars.length; i++) {
    var announceItems = bars[i].querySelectorAll('p');
    var announceLabel = bars[i].querySelector('p[style="text-align: left;"]:first-child');
    var announceLink = bars[i].querySelector('p[style="text-align: right;"]:last-child a');
    var announceSlides = bars[i].querySelectorAll('p[style="text-align: center;"]');

    // if (announceSlides.length == announceItems.length && announceItems.length > 0) {
    //   bars[i].classList.add('slide-promo--wrap')
    // }

    if (announceLabel && announceLink) {
      var announceText = announceLabel.textContent;
      var marqueeMarkup = "<span>" + announceText + "</span>";
      announceLabel.innerHTML = multiString(marqueeMarkup, 6);
      announceLabel.classList.add('marquee-promo');
    }
    // if (announceLink) console.log(announceLink.textContent)
  }
  if (bars) {
    if (bars.length > 0) return true;
  }
  return false;
};

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

var searchClick = function searchClick() {
  setTimeout(function () {
    var searchModal = document.querySelector('.header-section .search-modal');
    var searchInput = document.querySelector('.header-section .search-modal__header .search-group input');
    if (searchInput) {
      // console.log(searchInput)
      if (searchInput.classList.contains("empty")) {
        if (!searchModal.classList.contains("empty_input")) searchModal.classList.add("empty_input");
      }
      // let searchTimeout = false
      searchInput.addEventListener("input", function (e) {
        var searchKeywords = searchInput.value.trim();
        var noResult = searchModal.querySelector(".search-modal__no-result");
        // clearTimeout(searchTimeout)
        // if (!searchModal.classList.contains("inputing")) searchModal.classList.add("inputing")
        if (noResult) {
          if (!noResult.classList.contains("inputing")) noResult.classList.add("inputing");
        }
        if (searchKeywords.length == 0 || searchKeywords == "") {
          if (!searchModal.classList.contains("empty_input")) searchModal.classList.add("empty_input");
        } else {
          if (searchModal.classList.contains("empty_input")) searchModal.classList.remove("empty_input");
        }
      });
    }
  }, 150);
};

document.addEventListener("scroll", function () {

  trackFeatureImage();
});
//# sourceMappingURL=scripts-dist.js.map