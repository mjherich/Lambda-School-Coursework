/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="./assets/carousel/mountains.jpeg" />
    <img src="./assets/carousel/computer.jpeg" />
    <img src="./assets/carousel/trees.jpeg" />
    <img src="./assets/carousel/turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/

// Images to be used in carousel
const images = [
  './assets/carousel/mountains.jpeg',
  './assets/carousel/computer.jpeg',
  './assets/carousel/trees.jpeg',
  './assets/carousel/turntable.jpeg'
]

// Inject carousel into DOM
document.querySelector('.carousel-container').appendChild(Carousel(images))

// The carousel function accepts an array of image urls and outputs a working, infinite carousel
function Carousel(images) {
  // Set initial slide to 0
  const slide = 0

  // Create elements
  const carousel = document.createElement('div')
  const leftBtn = document.createElement('div')
  const rightBtn = document.createElement('div')
  leftBtn.textContent = "<"
  rightBtn.textContent = ">"

  // Apply classes
  carousel.classList.add('carousel')
  leftBtn.classList.add('left-button')
  rightBtn.classList.add('right-button')

  // Stitch together elements
  carousel.appendChild(leftBtn)
  // Iterate over images input and append them to carousel
  images.forEach((image, idx) => {
    const img = document.createElement('img')
    img.src = image
    img.dataset.slide = idx
    if (idx===0) { img.classList.add('active') } // Make initial slide visible
    carousel.appendChild(img)
  })
  carousel.appendChild(rightBtn)

  // Add event listeners to navigation buttons
  leftBtn.addEventListener('click', e => {
    const activeSlide = document.querySelector('.active')
    const activeIdx = parseInt(activeSlide.dataset.slide)
    // Remove active class on current index
    activeSlide.classList.remove('active')
    // Add active class to next index
    if (activeIdx === 0) { // If at start of carousel, the previous index is the last index
      console.log('at beginning')
      const nextActiveSlide = document.querySelector(`[data-slide="${images.length-1}"]`)
      nextActiveSlide.classList.add('active')
    } else {
      const nextActiveSlide = document.querySelector(`[data-slide="${activeIdx-1}"]`)
      nextActiveSlide.classList.add('active')
    }
    // GSAP
    TweenMax.fromTo(document.querySelector('.active'), 0.6, {x:-100, opacity: 0}, {x:0, opacity: 1})
    leftBtn.style.zIndex = 9001
    rightBtn.style.zIndex = 9001
  })
  rightBtn.addEventListener('click', e => {
    const activeSlide = document.querySelector('.active')
    const activeIdx = parseInt(activeSlide.dataset.slide)
    // Remove active class on current index
    activeSlide.classList.remove('active')
    // Add active class to next index
    if (activeIdx === images.length-1) { // If at end of carousel, the next index is the first index
      console.log('at end')
      const nextActiveSlide = document.querySelector(`[data-slide="0"]`)
      nextActiveSlide.classList.add('active')
    } else {
      const nextActiveSlide = document.querySelector(`[data-slide="${activeIdx+1}"]`)
      nextActiveSlide.classList.add('active')
    }
    // GSAP
    TweenMax.fromTo(document.querySelector('.active'), 0.6, {x:100, opacity: 0}, {x:0, opacity: 1})
    leftBtn.style.zIndex = 9001
    rightBtn.style.zIndex = 9001
  })

  return carousel
}
console.log('firstoftype',document.querySelector('.carousel img:first-of-type'))