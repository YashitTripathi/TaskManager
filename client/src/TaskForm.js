import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onUpdate, onCancel }) => {
  const [editableTask, setEditableTask] = useState(task);

  useEffect(() => {
    setEditableTask(task);
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    onUpdate(editableTask);
  };

  return (
    <div className="task-form">
      <h2>Edit Task</h2>
      <form>
        <label>Task Name:</label>
        <input type="text" name="task_name" value={editableTask.task_name} onChange={handleInputChange} />
        <label>Description:</label>
        <input type="text" name="task_description" value={editableTask.task_description} onChange={handleInputChange} />
        <label>Due Date:</label>
        <input type="date" name="due_date" value={editableTask.due_date} onChange={handleInputChange} />
        <label>Priority:</label>
        <select name="priority" value={editableTask.priority} onChange={handleInputChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskForm;
