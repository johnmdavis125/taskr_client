import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

export default function App() {

  const [newTask, updateNewTask] = useState({
    title: '',
    completed: false
  });
  
  const [allTasks, updateAllTasks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json(); 
        updateAllTasks([...data]);
        console.log(data);
      } catch(error) {
        console.error(error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    updateNewTask({
      ...newTask.title,
      [e.target.id]: e.target.value
    })
    console.log(newTask)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
          body: JSON.stringify(newTask.title)
        });
      const data = response.json();
      console.log(data)
      await updateAllTasks([...allTasks, data]);
      await updateNewTask({
        title: '',
        completed: false
      });
    } catch (error) {
      console.error(error);
    }
  })();
}

  return (
    <div className="App">
      <h1>Hello World!</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='newTask'>Enter a new Task</label>
        <input type='text' id='newTask' name='newTask' value={newTask.title} placeholder='Enter a task here' onChange={handleChange}></input>
      </div>
      <input 
          type='submit'
          name=''
          value='Create Task'
          ></input>
    </form>

    
    {allTasks.length > 0 &&
    allTasks.map((newTask) => {
      return (
        <div>
        <h4>Task: {newTask.title}</h4>
        <h6>Completed: {newTask.completed === true ? 'true' : 'false'}</h6>
        </div>
      )
    })
  }

    </div>
    
  );
}

