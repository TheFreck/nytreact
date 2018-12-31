# nytreact
This is a React app which uses the New York Times API and MongoDB
## Layout
* The search box will return 10 articles on the topic
* Each article will have a read and a save button
* Saved articles appear on the right
* Reading an article will engage an iFrame allowing the user to read the article without leaving the app 
### Plumbing
* This app uses Node.js on the backend and is rendered with React up front
* MongoDB provides data persistence and Express server ties the room together
