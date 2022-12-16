import PropTypes from 'prop-types';
import React from 'react';
import './Task.css';

// const Task = ({ id, title, isComplete }) => {
const Task = (props) => {
  const id = props.id;
  const title = props.title;
  const isComplete = props.isComplete;
  const markComplete = props.markComplete;
  const deleteTask = props.deleteTask;
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const toggleComplete = () => {
    markComplete({ id: id, title: title, isComplete: !isComplete });
    console.log(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={toggleComplete}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => {
          deleteTask(id);
        }}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
