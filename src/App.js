import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const initialCopy = INITIAL_TASKS.map((task) => {
    return { ...task };
  });

  // ****** DEBUG HERE *****
  const [complete, setComplete] = useState(initialCopy);

  // loops over initialCopy to find the item with the ID that we're looking to mark as complete
  // marks that item complete - returns list of all items with the one updated item
  const markComplete = (taskID) => {
    const tasks = initialCopy.map((task) => {
      if (task.id === taskID) {
        return taskID;
      }
    });
    setComplete(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList tasks={INITIAL_TASKS} markComplete={markComplete} />}
        </div>
      </main>
    </div>
  );
};

export default App;
