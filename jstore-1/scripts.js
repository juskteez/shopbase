// Mutation object creation
const mutationNode   = document.getElementsByTagName('TITLE')[0];
const mutationConfig = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const mutationCallback = function(mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      //console.log('A child node has been added or removed.');
      initation(true);
    }
    else if (mutation.type === 'attributes') {
      //console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationCallback);

// Dynamic components
let featureImageCardSet = []
let featureImageWrapSet = []
let featureImageSet     = []
let activeFeatureImage  = []
let renderFeatureImage  = []

const componentParse = (reinit) => {
  // Universal components
  featureImageWrapSet = []
  featureImageSet     = []
  activeFeatureImage  = []
  renderFeatureImage  = []
  featureImageCardSet = document.querySelectorAll(".feature-set-content-wrap .feature-image.grid")
  for (let i = 0; i < featureImageCardSet.length; i++) {
    // let imageWrap = featureImageCardSet[i].firstChild
    featureImageWrapSet.push(featureImageCardSet[i].firstChild)
    featureImageSet.push(featureImageCardSet[i].firstChild.querySelector('img'))
    activeFeatureImage.push(false)
    renderFeatureImage.push(undefined)
  }
}

// Initation process
const initation = (reinit) => {
  componentParse(reinit)
}

// Initation on page loaded
window.onload = function() {
  initation();
}

// Begin detect page changes
observer.observe(mutationNode, mutationConfig);

// Static components
let hamburger = document.querySelector("header.header-mobile label.mobile-nav")

hamburger.addEventListener("click", () => {
  let bodyClass = document.body.classList
  if (bodyClass.contains("is-noscroll")) {
    if (bodyClass.contains("nav-active")) bodyClass.remove("nav-active")
  } else {
    if (!bodyClass.contains("nav-active")) bodyClass.add("nav-active")
  }
})

// Dynamic methods

let transformFeatureImage = (i) => {
  let offsetTop    = featureImageCardSet[i].getBoundingClientRect().top
  let offsetScreen = (offsetTop - window.innerHeight) * -1

  let progress   = offsetScreen / (window.innerHeight)
  let wrapTop    = featureImageWrapSet[i].offsetTop * -1
  featureImageSet[i].style["transform"] = "translate(0," + (progress * wrapTop) + "px)"
  renderFeatureImage[i] = requestAnimationFrame(() => {
    transformFeatureImage(i)
  })
}

let trackFeatureImage = () => {
  for (let i = 0; i < featureImageCardSet.length; i++) {
    if (featureImageSet[i]) {
      let offsetScreen = (featureImageCardSet[i].getBoundingClientRect().top - window.innerHeight) * -1
      let nudge        = 200
      let overScreen   = offsetScreen - featureImageCardSet[i].offsetHeight - nudge

      if (offsetScreen > nudge*-1 && overScreen < window.innerHeight) {
        if (activeFeatureImage[i] == false) {
          activeFeatureImage[i] = true
          renderFeatureImage[i] = requestAnimationFrame(() => {
            transformFeatureImage(i)
          })
        }
      } else {
        if (activeFeatureImage[i] == true) {
          activeFeatureImage[i] = false
          cancelAnimationFrame(renderFeatureImage[i])
        }
      }
    }
  }
}

document.addEventListener("scroll", () => {

  trackFeatureImage()

})