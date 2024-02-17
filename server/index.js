// Import required modules
import express from 'express';
import cors from 'cors'; // Import cors package
import mysql from 'mysql2';
// Create connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Yashittripathi',
    database: 'mernapp'
});

// Create Express app
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins
// Create a task
app.post('/tasks', (req, res) => {
    const { task_name, task_description, due_date, priority } = req.body;
    pool.query('INSERT INTO tasks (task_name, task_description, due_date, priority) VALUES (?, ?, ?, ?)',
        [task_name, task_description, due_date, priority],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error creating task');
            }
            res.status(201).send('Task created successfully');
        });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    pool.query('SELECT * FROM tasks', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error fetching tasks');
        }
        res.json(results);
    });
});

// Get a task by ID
app.get('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    pool.query('SELECT * FROM tasks WHERE task_id = ?', [taskId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error fetching task');
        }
        if (results.length === 0) {
            return res.status(404).send('Task not found');
        }
        res.json(results[0]);
    });
});

// Update a task
app.put('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const { task_name, task_description, due_date, priority, status } = req.body;
    pool.query('UPDATE tasks SET task_name = ?, task_description = ?, due_date = ?, priority = ?, status = ? WHERE task_id = ?',
        [task_name, task_description, due_date, priority, status, taskId],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error updating task');
            }
            res.send('Task updated successfully');
        });
});

// Delete a task
app.delete('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    pool.query('DELETE FROM tasks WHERE task_id = ?', [taskId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error deleting task');
        }
        res.send('Task deleted successfully');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
