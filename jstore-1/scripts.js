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
  let featureImagePos = []
  for (let i = 0; i < featureImageSet.length; i++) {
    let featureImage = featureImageSet[i]
    let imageHeight  = featureImage.offsetHeight
    let offsetTop    = featureImage.getBoundingClientRect().top
    let offsetScreen = offsetTop - windowHeight
    featureImagePos.push(offsetScreen)
  }
  // console.info(featureImagePos)
})