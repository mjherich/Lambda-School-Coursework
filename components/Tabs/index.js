// Step 2: Create Tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is returned console.log it and review the structure.
// Iterate over the topics creating a new Tab component and add it to the DOM
// under the .topics element.
//
//  The tab component should look like this:
//    <div class="tab">topic here</div>

axios.get('https://lambda-times-backend.herokuapp.com/topics')
    .then(data => {
        console.log('SUCCESS: ', data)
        const topics = document.querySelector('.topics')
        console.log(data.data.topics)
        data.data.topics.forEach(topic => {
            // Create topic tab component and add to .topics element
            const topicTab = document.createElement('div')
            topicTab.classList.add('tab')
            topicTab.textContent = topic
            console.log(topicTab)
            topics.appendChild(topicTab)
        })
    })
    .catch(error => {
        console.log('ERROR: ', error)
    })