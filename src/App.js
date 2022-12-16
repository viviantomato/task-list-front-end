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
    isComplete: false,
  },
];

const App = () => {
  const initialCopy = INITIAL_TASKS.map((task) => {
    return { ...task };
  });

  // ****** DEBUG HERE *****
  const [taskList, setTaskList] = useState(initialCopy);

  // loops over initialCopy to find the item with the ID that we're looking to mark as complete
  // marks that item complete - returns list of all items with the one updated item
  const markComplete = (taskToUpdate) => {
    const tasks = taskList.map((task) => {
      if (task.id === taskToUpdate.id) {
        return taskToUpdate;
      }
      return task;
    });
    setTaskList(tasks);
  };

  // using filter
  const deleteTask = (taskId) => {
    console.log('delete Func');
    const tasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskList}
            markComplete={markComplete}
            deleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
