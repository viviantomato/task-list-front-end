# Wave 01: Setup and Baseline

**Learn Topics: React Components, Props, and State & Event Handling required for this wave**

## Setup

Use the following steps to get started:

1. One team member should fork and clone the repository.
1. Add other team member(s) as collaborators in GitHub
1. Run `yarn install` to install dependencies.
1. Run `yarn start` to run the local development server.

## Baseline

In Wave 01, we will explore the starter code for Task List Front End.

Read through the code in `App.js`, `TaskList.js` and `Task.js` and their style sheets to understand how data and events are being handled. You may use the following questions and suggestions to guide your exploration:

1. What `props` does `Task` have? Where do they come from? -
   -> props: id, title, isComplete;
   -> They come from TaskList.js

2. The `Task` component uses destructuring to read in the props `const Task = ({ id, title, isComplete }) => {...`

   - How would the code change if `{id, title, isComplete}` were replaced with `props`?
     - A: we would have to separate all of the elements of the props under Task. ex. props.id

   - Consider making this change and the subsequent necessary changes through the rest of the component to deepen your understanding of the code
     - x

   -> const Task = (props) => {
   const [complete, setComplete] - useState(props.isComplete);
   }

3. How is the ~~strikethrough~~ style applied when the task title is clicked?
    - A: there is a button with a toggle on line 18 of Task.js that turns a CSS text decoration strikethrough on and off

   - Consider updating the appropriate rule sets to change the text or background color when a task is marked complete.
   - x

   -> Task.js
   When the task is complete, apply the strikethrough style.
   Toggle: complete >< incomplete

4. What `props` does `TaskList` have? Where do they come from?
   -> from App.js. TaskList has one props - tasks, type is an array of objects.

5. Where is the function `getTaskListJSX` called in `TaskList`? - How would the code change without this helper function?
   -> called in return statement on Line19. This helper function maps the TASKS props for each task. Without it, we need to type out all the props in the return statement again.

6. What component is `TASKS` passed to in `App`?

   - How does the component pass `TASKS`?
   - What element is the component wrapped in?

   -> TASKS is passed to the TaskList component in the App component.
   The TaskList component receives TASKS as a prop, which is passed to it by the App component. The TaskList component is wrapped in a div element in the App component.

The suggestions above should give you a strong foundation for working with Task List Front End. As time allows, follow your curiosity to explore more of the code and features.
