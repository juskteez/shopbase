// Mutation object creation
let mutationNode     = document.getElementsByTagName('TITLE')[0]
const mutationConfig = { attributes: true, childList: true, subtree: true }

// Callback function to execute when mutations are observed
const mutationCallback = function(mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      //console.log('A child node has been added or removed.');
      initation(true)
      setTimeout(initation, 2000)
    }
    else if (mutation.type === 'attributes') {
      //console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationCallback);
// Dynamic components
let pageBody = false
let featureImageCardSet = []
let featureImageWrapSet = []
let featureImageSet     = []
let activeFeatureImage  = []
let renderFeatureImage  = []
let searchTrigger       = false
let searchServed        = false
let hamburger           = false
let hamburgerServed     = false
let announceBar         = false
let announceBarServed   = false
let awkwardLoad         = false

const clickServe = (element, trigger, callback) => {
  if (element) {
    if (trigger == false) {
      element.addEventListener("click", callback)
      return true
    } else {
      return true
    }
  }
  return false
}
const loadServe = (elements, trigger, callback) => {
  if (elements) {
    if (trigger == false) {
      return callback(elements)
    } else {
      return true
    }
  }
  return false
}

const componentParse = (reinit) => {
  if (awkwardLoad) {
    mutationNode = document.getElementsByTagName('TITLE')[0]
    if (mutationNode) {
      observer.disconnect()
      observer.observe(mutationNode, mutationConfig)
      awkwardLoad = false
    } else {
      awkwardLoad = true
    }
  }
  // Universal components
  pageBody = document.querySelector(".default-layout > main.main-content") || false
  // pageBody  = storeBody.firstChild

  searchTrigger       = document.querySelector('header.header-mobile .header-wrap a.search-icon')
  hamburger           = document.querySelector("header.header-mobile label.mobile-nav")
  searchServed        = clickServe(searchTrigger, searchServed, searchClick)
  hamburgerServed     = clickServe(hamburger, hamburgerServed, hamburgerTrigger)
  announceBar         = document.querySelectorAll("header .promo_banner")
  announceBarServed   = loadServe(announceBar, announceBarServed, announceBarShow)

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

  let footer_links = document.querySelectorAll('.footer_link a[href*="/policies/"]')
  for (let n = 0; n<footer_links.length; n++) {
    let link_text = footer_links[n].textContent

    if (link_text.includes(" policy")) {
      footer_links[n].setAttribute("replace-text", link_text.replace(" policy", ""))
    }
  }
  
  if (pageBody instanceof Element) {
    if (pageBody.firstChild) {
      if (pageBody.firstChild.classList.contains("product-template")) {
        if (!document.body.classList.contains("product-details-page")) document.body.classList.add("product-details-page")
      } else {
        if (document.body.classList.contains("product-details-page")) document.body.classList.remove("product-details-page")
      }
    } else {
      if (document.body.classList.contains("product-details-page")) document.body.classList.remove("product-details-page")
    }
  }
}

// Initation process
const initation = (reinit=false) => {
  componentParse(reinit)
}

// Begin detect page changes
if (mutationNode) {
  observer.observe(mutationNode, mutationConfig)
} else {
  // Initation on page loaded
  awkwardLoad  = true
  let bodyTemp = document.querySelector("#app")
  let cfgTemp  = { attributes: true, childList: true, subtree: false }
  observer.observe(bodyTemp, cfgTemp)
}

// Static components
const hamburgerTrigger = () => {
  let bodyClass = document.body.classList
  if (bodyClass.contains("is-noscroll")) {
    if (!bodyClass.contains("nav-active")) bodyClass.add("nav-active")
  } else {
    if (bodyClass.contains("nav-active")) bodyClass.remove("nav-active")
  }
}

const multiString = ( string, times = 1 ) => {
  if (times > 0) {
    return string + multiString( string, times-1 )
  } else {
    return ""
  }
}

const announceBarShow = (bars) => {
  for (let i = 0; i < bars.length; i++) {
    let announceLabel = bars[i].querySelector('p[style="text-align: left;"]:first-child')
    let announceLink = bars[i].querySelector('p[style="text-align: right;"]:last-child a')

    if (announceLabel && announceLink) {
      let announceText = announceLabel.textContent
      let marqueeMarkup = "<span>" + announceText + "</span>"
      announceLabel.innerHTML = multiString(marqueeMarkup, 6)
      announceLabel.classList.add('marquee-promo')
    }
    // if (announceLink) console.log(announceLink.textContent)
  }
  if (bars) {
    if (bars.length > 0) return true
  }
  return false
}

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

const searchClick = () => {
  setTimeout( () => {
    let searchModal = document.querySelector('.header-section .search-modal')
    let searchInput = document.querySelector('.header-section .search-modal__header .search-group input')
    if (searchInput) {
      // console.log(searchInput)
      if (searchInput.classList.contains("empty")) {
        if (!searchModal.classList.contains("empty_input")) searchModal.classList.add("empty_input")
      }
      // let searchTimeout = false
      searchInput.addEventListener("input", (e) => {
        let searchKeywords = searchInput.value.trim()
        let noResult       = searchModal.querySelector(".search-modal__no-result")
        // clearTimeout(searchTimeout)
        // if (!searchModal.classList.contains("inputing")) searchModal.classList.add("inputing")
        if (noResult) {
          if (!noResult.classList.contains("inputing")) noResult.classList.add("inputing")
        }
        if (searchKeywords.length == 0 || searchKeywords == "") {
          if (!searchModal.classList.contains("empty_input")) searchModal.classList.add("empty_input")
        } else {
          if (searchModal.classList.contains("empty_input")) searchModal.classList.remove("empty_input")
        }
      })
    }
  },150)
}

document.addEventListener("scroll", () => {

  trackFeatureImage()

})