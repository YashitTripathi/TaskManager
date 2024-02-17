import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
 


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editableTask, setEditableTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUpdate = (task) => {
    setEditableTask(task);
  };

  const handleCancelEdit = () => {
    setEditableTask(null);
  };

  const handleFormUpdate = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${updatedTask.task_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });
      if (response.ok) {
        console.log('Task updated successfully');
        setEditableTask(null);
        fetchTasks(); // Refresh tasks after update
      } else {
        console.error('Error updating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Task deleted successfully');
        // Optionally, update tasks state to remove the deleted task
        fetchTasks(); // Refresh tasks after deletion
      } else {
        console.error('Error deleting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <div>
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.task_id}>
              <td>{task.task_id}</td>
              <td>{task.task_name}</td>
              <td>{task.task_description}</td>
              <td>{task.due_date}</td>
              <td>{task.priority}</td>
              <td>
                <button onClick={() => handleUpdate(task)}>Update</button>
                <button onClick={() => handleDelete(task.task_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editableTask && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={handleCancelEdit}>X</button>
            <TaskForm task={editableTask} onUpdate={handleFormUpdate} onCancel={handleCancelEdit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
