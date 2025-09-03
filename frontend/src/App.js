import './styles/App.css';
import React, { useEffect } from 'react';
import Header from "./components/Header";
import TaskList from './components/TaskList';
import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import ConfirmModal from './components/ConfirmModal';
import EditModal from './components/EditModal';
import axios from "axios";



export default function App(){

  const [tasks, setTask] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null); //set to null bc no task is selected for deletion
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editTaskContent, setEditTaskContent] = useState("");

  function fillTask(str){
    setNewTaskContent(str);
  }

  function addTask(){
    axios.post('http://localhost:4000/task', {
      content: newTaskContent
    })
    .then( res => {
      setTask([...tasks, res.data])
      setNewTaskContent('');
    }
    )
    .catch(err => {
      console.error("error adding tasks", err)
    });
  }

  useEffect(() => {
    axios.get("http://localhost:4000/task")
    .then(res => {
      setTask(res.data);
    })
    .catch(err => {
      console.error("error fetching tasks:", err);
    });
  }, []);


function handleDelete(id){
  axios.delete(`http://localhost:4000/task/${id}`)
  .then( res => {
    setTask(tasks.filter(task => task._id !== id))
  })
  .catch(err => {
    console.error("error deleting task", err);
  })
}

function handleEdit(id, content){
  axios.put(`http://localhost:4000/task/${id}`, {content})
  .then(res => {
    //find task with that id
    const updatedTasks = tasks.map(task => {
       if(task._id === id){
          return {...task, content:content};
        }
        else{
          return task
        }
      }
    )
    setTask(updatedTasks); //update in React
  })
  .catch(err => {
    console.error("could not edit task")
  })
}

function clearTasks(){
  setTask([]);
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
        <button type='button' id='clear' onClick={clearTasks}>Clear All</button>
      </div>
    </section>
      {taskToDelete && (
      <ConfirmModal
        onConfirm={() => {
          handleDelete(taskToDelete._id)
          setTaskToDelete(null)
        }}
        onCancel={() => setTaskToDelete(null)}
        message="Are you sure you want to delete?"
      />
    )}
    {taskToEdit && (
      <EditModal
        onConfirm={()=>{
           handleEdit(taskToEdit._id, editTaskContent)
          setTaskToEdit(null)
        }}
        onCancel={() => {
          setTaskToEdit(null);
          setEditTaskContent("");
        }}
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