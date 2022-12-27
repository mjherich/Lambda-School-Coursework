1. What problem does the context API help solve?

The context API helps solve the problem of prop drilling by allowing us to pass data through a context object.

2. In your own words, describe `actions`, `reducers` and the `store` and their role in Redux. What does each piece do? Why is the store known as a 'single source of truth' in a redux application?

Actions get dispatched to the reducers by action creators and contain information on how to update the store. Each action has an `action.type` and an `action.payload` which determines how the store will change. It is the reducer's job to take in actions and return a new store object without mutating anything. A new store is generated for each action.

3. What is the difference between Application state and Component state? When would be a good time to use one over the other?

Application state is what redux provides a solution for with `createStore()` and component state is typically kept track of with `useState()`. Application state should contain the most relevant information pertaining to the app whereas component state can be used for more trivial peices of the app like storing a temporary user input value prior to being submitted to the redux store.

4. Describe `redux-thunk`, what does it allow us to do? How does it change our `action-creators`?

`redux-thunk` allows us to query APIs in our action creators and only dispatch an action once we receive a response. Without `redux-thunk` async requests would not work.

5. What is your favorite state management system you've learned and this sprint? Please explain why!

I think Redux makes a lot of sense if the scope of the project warrants it's use, however, for small projects that only take a few hours to create I like the idea of keeping it simple with `useContext()`