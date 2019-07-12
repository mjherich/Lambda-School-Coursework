// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

axios.get('https://lambda-times-backend.herokuapp.com/articles')
    .then(data => {
        console.log('SUCCESS: ', data)
        const articleCategories = data.data.articles
        console.log('Article Categories: ', articleCategories)
        for (let articleCategory in articleCategories) {
            console.log('category', articleCategory)
            console.log(articleCategories[articleCategory])
            articleCategories[articleCategory].forEach(article => {
                const card = Card(article)
                card.dataset.topic = articleCategory
                // Append each article card to .cards-container
                document.querySelector('.cards-container').appendChild(card)
            })
        }
    })
    .catch(error => {
        console.log('ERROR: ', error)
    })

function Card(articleData) {
    // Create individual component elements
    const card = document.createElement('div')
    const headline = document.createElement('div')
    const authorContainer = document.createElement('div')
    const imgContainer = document.createElement('div')
    const authorImg = document.createElement('img')
    const authorName = document.createElement('span')

    // Add classes to elements
    card.classList.add('card')
    headline.classList.add('headline')
    authorContainer.classList.add('author')
    imgContainer.classList.add('img-container')

    // Apply data from api
    headline.textContent = articleData.headline
    authorImg.src = articleData.authorPhoto
    authorName.textContent = articleData.authorName

    // Stitch together component then return it
    card.appendChild(headline)
    card.appendChild(authorContainer)
    authorContainer.appendChild(imgContainer)
    imgContainer.appendChild(authorImg)
    authorContainer.appendChild(authorName)
    console.log('card: ', card)
    return card
}