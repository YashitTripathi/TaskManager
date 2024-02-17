import React, { useState } from 'react';

const CreateTask = ({ addTask }) => {
  const [taskData, setTaskData] = useState({
    task_name: '',
    task_description: '',
    due_date: '',
    priority: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setTaskData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTask(taskData);
    setTaskData({
      task_name: '',
      task_description: '',
      due_date: '',
      priority: ''
    });
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="task_name" value={taskData.task_name} onChange={handleChange} placeholder="Task Name" required />
        <textarea name="task_description" value={taskData.task_description} onChange={handleChange} placeholder="Task Description" required />
        <input type="date" name="due_date" value={taskData.due_date} onChange={handleChange} required />
        <select name="priority" value={taskData.priority} onChange={handleChange} required>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
