import './App.css';
import React from 'react';
import Header from "./components/Header";
import TaskList from './components/TaskList';
import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import ConfirmModal from './components/ConfirmModal';
import EditModal from './components/EditModal';


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

const [taskToDelete, setTaskToDelete] = useState(null); //set to null bc no task is selected for deletion
const [taskToEdit, setTaskToEdit] = useState(null);
const [editTaskContent, setEditTaskContent] = useState("");

function handleDelete(id){
  setTask(tasks.filter(task => task.id !== id));
  setTaskToDelete(null);
}

function handleEdit(id, content){
  setTask(tasks.map(t => t.id === id ? {...t, content} : t)); //replace content if found
  setTaskToEdit(null);
}

const [newTaskContent, setNewTaskContent] = useState("");
  return (
    <>
    <section>
      <Header />
      <div className='container'>
        <TaskList
          tasks = {tasks}
          onDelete={(task) => setTaskToDelete(task)}
          onEdit={(task)=>{
            setTaskToEdit(task);
            setNewTaskContent(task.content);
          }}
        />
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
      {taskToDelete && (
      <ConfirmModal
        onConfirm={() => handleDelete(taskToDelete.id)}
        onCancel={() => setTaskToDelete(null)}
        message="Are you sure you want to delete?"
      />
    )}
    {taskToEdit && (
      <EditModal
        onConfirm={()=> handleEdit(taskToEdit.id, editTaskContent)}
        onCancel={() => setTaskToEdit(null)}
        message={
          <div>
            <input type='text'
            placeholder='edit your task'
            value={editTaskContent}
            onChange={e => setEditTaskContent(e.target.value)}
          />
          </div>
        }
      />
    )}
    </>
  );
}