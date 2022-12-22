import { React, useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const INITIAL_FORM_DATA = {
  id: 0,
  title: '',
  description: '',
  isComplete: false,
};

const NewTaskForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    console.log('handleChange called');
    console.log(
      `Target name: ${e.target.name} Target value: ${e.target.value}`
    );
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    props.addTaskCallbackFunc(formData);
    setFormData({
      title: '',
      description: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleNewTaskSubmit}>
        <label htmlFor="title">Task Name</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        ></input>

        <label htmlFor="description">Task Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></input>
        <input type="submit" value="Add Task" />
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  addTaskCallbackFunc: PropTypes.func.isRequired,
};
export default NewTaskForm;
