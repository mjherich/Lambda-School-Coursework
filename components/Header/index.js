// STEP 1: Create a header component.
// -----------------------
// Using a function create the component you see below:
//
//  <div class="header">
//    <span class="date">SMARCH 28, 2019</span>
//    <h1>Lambda Times</h1>
//    <span class="temp">98°</span>
//  </div >
// And add it to the DOM in the .headerContainer component

function Header() {
    // Create DOM elements for Header component
    const header = document.createElement('div')
    const date = document.createElement('span')
    const title = document.createElement('h1')
    const temp = document.createElement('span')

    // Apply classes to elements
    header.classList.add('header')
    date.classList.add('date')
    temp.classList.add('temp')

    // Add content to elements
    date.textContent = "March 28, 2019"
    title.textContent = "Lambda Times"
    temp.textContent = "98°"

    // Stitch together elements
    header.appendChild(date)
    header.appendChild(title)
    header.appendChild(temp)

    return header
}

// Add header to .header-container component
console.log(document.querySelector('.header-container'))
document.querySelector('.header-container').appendChild(Header())