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

  return (
    <div className="App">
      <h1>Hello World!</h1>

    <form>
      <div>
        <label htmlFor='newTask'>Enter a new Task</label>
        <input type='text' id='newTask' name='newTask'></input>
      </div>
    </form>

    
    {allTasks.length > 0 &&
    allTasks.map((newTask) => {
      return (
        <h4>{newTask.title}</h4>
      )
    })
  }

    </div>
    
  );
}

