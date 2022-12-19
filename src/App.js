import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const INITIAL_TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: false,
//   },
// ];

const App = () => {
  const [taskList, setTaskList] = useState([]);

  const URL = 'http://localhost:5000/tasks';
  // const initialCopy = INITIAL_TASKS.map((task) => {
  //   return { ...task };
  // });

  // loops over initialCopy to find the item with the ID that we're looking to mark as complete
  // marks that item complete - returns list of all items with the one updated item

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        //making a copy of the data to display to DOM
        const tasksAPICopy = res.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTaskList(tasksAPICopy);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const markComplete = (taskObj) => {
    const newTasksList = [];

    // const taskObjCopy = res.data.map((task) => {
    //   return {
    //     id: task.id,
    //     title: task.title,
    //     isComplete: task.isComplete,
    //   };
    // });

    // debug here!!

    if (taskObj.isComplete === true) {
      axios
        .patch(`${URL}/${taskObj.id}/mark_complete`) // the "/" represents the / found in the endpoint
        .then((res) => {
          for (const task of taskList) {
            if (task.id !== taskObj.id) {
              newTasksList.push(task);
            } else {
              const newTask = {
                ...task,
                isComplete: !taskObj.isComplete,
              };
              newTasksList.push(newTask);
            }
          }
          setTaskList(newTasksList);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(`${URL}/${taskObj.id}/mark_incomplete`) // the "/" represents the / found in the endpoint
        .then((res) => {
          for (const task of taskList) {
            if (task.id !== taskObj.id) {
              newTasksList.push(task);
            } else {
              const newTask = {
                ...task, //...bike is a shorthand for going through each element
                isComplete: taskObj.isComplete,
              };
              newTasksList.push(newTask);
            }
          }
          setTaskList(newTasksList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const markComplete = (taskToUpdate) => {
  //   const tasks = taskList.map((task) => {
  //     if (task.id === taskToUpdate.id) {
  //       return taskToUpdate;
  //     }
  //     return task;
  //   });
  //   setTaskList(tasks);
  // };

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
