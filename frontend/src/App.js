import './App.css';
import React from 'react';
import Header from "./components/Header";
import TaskList from './components/TaskList';
import { useState } from 'react';
import Task from './components/Task';
import { IoMdAdd } from "react-icons/io";


export default function App(){


   function fillTask(str){
    setNewTaskContent(str);
  }

  function addTask(){
    if(!newTaskContent) return; //only press button if has content in it..
    const newTask = {content: newTaskContent, id:Date.now()};
    setTask([...tasks, newTask]);
    setNewTaskContent(''); //clear text input
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
]);

const [newTaskContent, setNewTaskContent] = useState("");
  return (
    <section>
      <Header />
      <div className='container'>
        <TaskList tasks = {tasks} onDelete={(id) => setTask(tasks.filter(t => t.id !== id))}/>
      </div>
      <div className='input-container'>
        <input type='text'
        placeholder='add your task...'
        value={newTaskContent}
        onChange={(e) => fillTask(e.target.value)}
        />
        <button type='button' id='add' onClick={addTask}><IoMdAdd /></button>
      </div>
    </section>
  )
}