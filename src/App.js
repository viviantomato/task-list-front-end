import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

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

  const fetchAllTasks = () => {
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
  };

  useEffect(fetchAllTasks, []);

  const markComplete = (taskObj) => {
    const newTasksList = [];

    if (taskObj.isComplete === false) {
      console.log(taskObj.isComplete);
      console.log('toggling to true');
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
      console.log('toggling to false');
      axios
        .patch(`${URL}/${taskObj.id}/mark_incomplete`) // the "/" represents the / found in the endpoint
        .then((res) => {
          for (const task of taskList) {
            if (task.id !== taskObj.id) {
              newTasksList.push(task);
            } else {
              const newTask = {
                ...task, //...bike is a shorthand for going through each element
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
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const newTaskList = [];
        for (const task of taskList) {
          if (task.id !== taskId) {
            newTaskList.push(task);
          }
        }
        setTaskList(newTaskList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTask = (newTaskInfo) => {
    //use axios.post request here
    //handling .then to update frontend, update state variable with setBikesList()
    axios
      .post(URL, newTaskInfo)
      .then((response) => {
        // console.log(response);
        fetchAllTasks();
      })
      .catch((err) => {
        console.log(err);
      });
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
          <NewTaskForm addTaskCallbackFunc={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;

// const taskObjCopy = res.data.map((task) => {
//   return {
//     id: task.id,
//     title: task.title,
//     isComplete: task.isComplete,
//   };
// });
