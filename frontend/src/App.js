import './App.css';
import React from 'react';
import Header from "./components/Header";
import TaskList from './components/TaskList';
import { useState } from 'react';
import Task from './components/Task';


export default function App(){

  function addTask(){
    const newTask = {content: "new task", id:Date.now()};
    setTask([...tasks, newTask]);
  }

  const [tasks, setTask] = useState([
  {
    content: "do groceries",
    id: 123123123
  },
  {
    content: "leetcode",
    id: 234234234,
  },
  {
    content: "gym workout",
    id: 68680987,
  },
  {
    content: "date night",
    id: 23423432
  },
]);
  return (
    <section>
      <Header />
      <div className='container'>
        <TaskList tasks = {tasks}/>
      </div>
      <button type='button' id='add' onClick={addTask}>New Task</button>
    </section>
  )
}