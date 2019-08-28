Product Vision

Proposal

What problem does your app solve?
Be as specific as possible; how does your app solve the problem?
What is the mission statement?

Proposal: Tracking ‘salty’ users (and perhaps comments) on Hacker News. Aggregate Users and Comment Data then apply sentiment analysis. Mission: To provide maximum entertainment.
MVP: Each user will have a saltiness score. The app will show a list of users (sorted by saltiness). Also a search function to find users by username. Clicking on a username may lead to a page giving more details about their saltiness.                                           
Features 

What features are required for your minimum viable product?
What features may you wish to put in a future release?
What do the top 3 similar apps do for their users?
- Top 100 saltiest users (comments will be stretch)
- Word cloud of words from saltiest comments (stretch)
- 3 or 4 overall stats of the saltiness of all comments
- 
Frameworks - Libraries

What 3rd party frameworks/libraries are you considering using?
Do APIs require you to contact its maintainer to gain access?
Are you required to pay to use the API? 
Have you considered using Apple Frameworks? (MapKit, Healthkit, ARKit?)
Semantic UI with styled components https://react.semantic-ui.com/
Possibly React Vis for graphs: https://uber.github.io/react-vis/
For Data Scientists

Describe the Established data source with at least rough data able to be provided on day 1.

https://www.kaggle.com/hacker-news/hacker-news Kaggle Dataset and BIGQuery bigquery-public-data.hacker_news


You can gather information about the data set you’ll be working with from the project description. Be sure to collaborate with your PM, and your Backend Architect to chat about the resources you have.

O.k.


Write a description for what the DS problem is (what uncertainty/prediction are we trying to do here? Sentiment analysis? Why is this a useful solution to a problem?)

The first DS problem is to define “salty” in context to the HN comments and users. The second is annotating the dataset with these scores via NLP sentiment analysis and extensions to it. This is useful for censorship, shadowbanning or publicly humiliating users of the HN site.


A target (e.g. JSON format or such) for output that DS students can deliver to web/other students for them to ingest and use in the app 
]\\

We will be serving a DB for query, analysis results as well as JSON for graphics or extended functionality.
Target Audience

Who is your target audience? Be specific. Anyone curious about the sentiment of Hacker News users and comments. 
What feedback have you gotten from potential users? This thread on Hacker News https://news.ycombinator.com/item?id=19692249. There are comments on the accuracy of the analysis, as well as the UI design. 
Have you validated the problem and your solution with your target audience? How? Not exactly. However, several versions of the project already exist, such as:
https://www.hackersalt.com/
https://toxichackers.com/dragonwriter
https://atomiks.github.io/reddit-user-analyser/ 
Research

Research thoroughly before writing a single line of code. Solidify the features of your app conceptually before implementation. Spend the weekend researching so you can hit the ground running on Monday.
Prototype Key Feature(s)

This is the “bread and butter” of the app, this is what makes your app yours. Calculate how long it takes to implement these features and triple the time estimated. That way you’ll have plenty of time to finish. It is preferred to drop features and spend more time working on your MVP features if needed.