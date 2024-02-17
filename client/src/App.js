import react from 'react';
import { ReactDOM } from 'react';
import Loginform from './loginform';
import Createacc from './createacc'
import Tasks from './tasks';
import Users from './users'
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import HomePage from './HomePage';


import {BrowserRouter,Routes,Route} from "react-router-dom";
const App=()=>{
    const addTask = async (taskData) => {
        try {
          const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
          });
          if (response.ok) {
            console.log('Task created successfully');
            // Optionally, you can fetch tasks again to update the task list
          } else {
            console.error('Error creating task:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };
    
    return(
<>
<BrowserRouter>
    <Routes>
    <Route path='/' element={<Loginform credentials="valid"/> }/>
    <Route path='/home' element={<Loginform/> }/>
        <Route path='/createacc' element={<Createacc />}/>
        <Route path='/invalid' element={<Loginform credentials="invalid"/>}/>
        <Route path='/acccreated' element={<Loginform credentials="acccreated"/>}/>
        <Route path='/tasks' element={<TaskList />}/>
        <Route path='/users' element={<HomePage addTask={addTask} />}/>
    </Routes>
</BrowserRouter>
</>
    )
}
export default App;