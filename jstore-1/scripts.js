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

// Dynamic components
let featureImageCardSet = []
let featureImageWrapSet = []
let featureImageSet     = []
let activeFeatureImage  = []
let renderFeatureImage  = []

const componentParse = (page="", update=false) => {
  // Universal components
  featureImageCardSet = []
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

componentParse()

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
      let offsetTop    = featureImageCardSet[i].getBoundingClientRect().top
      let offsetScreen = (offsetTop - window.innerHeight) * -1
      let nudge        = 120
      let overScreen   = offsetScreen - featureImageCardSet[i].offsetHeight - nudge

      if (offsetScreen > nudge*-1 && overScreen < window.innerHeight) {
        if (activeFeatureImage[i] == false) {
          activeFeatureImage[i] = true
          // console.log("+ + FeatureImage", i)
          renderFeatureImage[i] = requestAnimationFrame(() => {
            transformFeatureImage(i)
          })
        }
      } else {
        if (activeFeatureImage[i] == true) {
          activeFeatureImage[i] = false
          // console.log(" -  FeatureImage", i)
          cancelAnimationFrame(renderFeatureImage[i])
        }
      }
    }
  }
  // featureImagesTransform = requestAnimationFrame(transformFeatureImage)
}

document.addEventListener("scroll", () => {

  trackFeatureImage()
})