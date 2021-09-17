console.info("Juskteez Store 1 Initiated")

let hamburger = document.querySelector("header.header-mobile label.mobile-nav")

hamburger.addEventListener("click", () => {
  let bodyClass = document.body.classList
  if (bodyClass.contains("is-noscroll")) {
    if (bodyClass.contains("nav-active")) bodyClass.remove("nav-active")
  } else {
    if (!bodyClass.contains("nav-active")) bodyClass.add("nav-active")
  }
})

let featureImageSet = document.querySelectorAll(".feature-set-content-wrap .feature-image.grid")
let windowHeight = window.innerHeight

document.addEventListener("scroll", () => {
  // let featureImagePos = []
  for (let i = 0; i < featureImageSet.length; i++) {
    let featureImage = featureImageSet[i]
    // let imageHeight  = featureImage.offsetHeight
    let offsetTop    = featureImage.getBoundingClientRect().top
    let offsetScreen = (offsetTop - window.innerHeight) * -1

    if (offsetScreen > 0) {
      let progress   = offsetScreen / (window.innerHeight)
      let imageWrap  = featureImage.firstChild
      let wrapTop    = imageWrap.offsetTop * -1
      let image      = imageWrap.querySelector('img')
      // if (progress > 1) progress = 1
      image.style["transform"] = "translate3d(0," + (progress * wrapTop) + "px,0)"
      // featureImagePos.push(progress * wrapTop)
    }
  }
  // if (featureImagePos.length > 0) console.info(featureImagePos)
})