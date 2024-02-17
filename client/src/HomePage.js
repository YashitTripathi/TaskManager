import React, { useState } from 'react';
import TaskList from './TaskList';
import CreateTask from './CreateTask';

const HomePage = ({ addTask }) => {
 

  return (
    <div>
      <h2>Create New Task</h2>
      <CreateTask addTask={addTask}/>
      <TaskList/>
    </div>
  );
};

export default HomePage;
