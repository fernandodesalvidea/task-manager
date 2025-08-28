import './App.css';
import React from 'react';
import Header from "./components/Header";
import TaskList from './components/TaskList';

const tasks = [
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
]

export default function App(){
  return (
    <section>
      <Header />
      <div className='container'>
        <TaskList tasks = {tasks}/>
      </div>
      <button type='button' id='add'>New Task</button>
    </section>
  )
}