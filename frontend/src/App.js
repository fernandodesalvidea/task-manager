import './styles/App.css';
import React, { useEffect } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import ConfirmModal from './components/ConfirmModal';
import EditModal from './components/EditModal';
import axios from 'axios';
import LoginPage from './components/LoginPage';

export default function App(){
  //state variables
  const [tasks, setTask] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null); 
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editTaskContent, setEditTaskContent] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const [showClearAllModal, setShowClearAllModal] = useState(null);
  const [taskPriority, setTaskPriority] = useState("Low");
  const [editTaskPriority, setEditTaskPriority] = useState("Low");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  function fillTask(str){
    setNewTaskContent(str);
  }

  function addTask(){
    axios.post('http://localhost:4000/task', {
      content: newTaskContent,
      priority: taskPriority
    })
    .then( res => {
      setTask([...tasks, res.data]) //save response to our array
      setNewTaskContent(''); //clear input box
    }
    )
    .catch(err => {
      console.error("error adding tasks", err)
    });
  }
  //this gets all the tasks from our backend
  useEffect(() => {
    if(isLoggedIn){
      axios.get("http://localhost:4000/task")
      .then(res => {
        setTask(res.data);
      })
      .catch(err => {
        console.error("error fetching tasks:", err);
      });
    }
  }, [isLoggedIn]);

  function handleLoginSuccess(){
    setIsLoggedIn(true);
  }

function handleDelete(id){
  axios.delete(`http://localhost:4000/task/${id}`)
  .then(() => {
    setTask(tasks.filter(task => task._id !== id)) //create a new array with all tasks except that one
  })
  .catch(err => {
    console.error("error deleting task", err);
  })
}

function handleEdit(id, content, priority){
  axios.put(`http://localhost:4000/task/${id}`, {content, priority})
  .then(res => {
    //create a new array with that updated task
    const updatedTasks = tasks.map(task => {
       if(task._id === id){
          return {...task, content:content, priority:priority};
        }
        else{
          return task
        }
      }
    )
    setTask(updatedTasks); //update in React
  })
  .catch(err => {
    console.error('could not edit task', err);
  })
}
//handler which gets called from when user clicks done checkmark, id gets passed from TaskList
function handleComplete(id){
  axios.put(`http://localhost:4000/${id}`)
 
  .then(res => {
    const checkedTasks = tasks.map(task => { //make a new array
      if(task._id === id){
        return {...task, done:true}; //set done to be true 
      }
      else {
        return task
      }
    })
    setTask(checkedTasks); //update in React
  }
  )
}

function clearTasks(){
  axios.delete(`http://localhost:4000/task`)
  .then(() => setTask([]))
  .catch(err => console.error('could not clear all tasks', err))
}

function handlePriorityChange(e){
  setTaskPriority(e.target.value) //modify state variable
}

function handleEditPriorityChange(e){
    setEditTaskPriority(e.target.value) //modify state variable to edit priority
}


function handleLogout() {
  localStorage.setItem("token", "");
  setIsLoggedIn(false);
}
 // ---- CONDITIONAL RENDERING ----
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }
  return (
    <>
    <Header onLogout = {handleLogout}/>
    <section>
      <div className='container'>
        <TaskList
          tasks = {tasks}
          onDelete={(task) => setTaskToDelete(task)}
          onEdit={(task)=>{
            setTaskToEdit(task);
            setEditTaskContent(task.content);
            setEditTaskPriority(task.priority);
          }}
          onComplete={handleComplete}  //set reference to handler to pass down
        />
      </div>
      <div className='input-container'>
        <input type='text'
        placeholder='add your task...'
        value={newTaskContent}
        onChange={(e) => fillTask(e.target.value)}
        />
        <select value={taskPriority} onChange={handlePriorityChange}> 
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type='button' id='add' onClick={addTask}><IoMdAdd /></button>
        <button type='button' id='clear' onClick={ () => {
          setShowClearAllModal(true);
          }}
          >Clear all</button>
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
           handleEdit(taskToEdit._id, editTaskContent, editTaskPriority)
          setTaskToEdit(null)

        }}
        onCancel={() => {
          setTaskToEdit(null);
          setEditTaskContent("");
        }}
        message={
          <div id='edit-task-dropdown'>
            <input type='text'
            placeholder='edit task content'
            value={editTaskContent}
            onChange={e => setEditTaskContent(e.target.value)}
          />
          <select value={editTaskPriority} onChange={handleEditPriorityChange}> 
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
          </div>
          
        }
      />
    )}
    {showClearAllModal && (
       <ConfirmModal
        onConfirm={() => {
          clearTasks();
          setShowClearAllModal(false)
        }}
        onCancel={() => setShowClearAllModal(false)}
        message="Warning: this will delete all tasks. Are you sure you want to proceed?"
      />
    )}
    <button onClick={handleLogout}>Logout</button>

    </>
  );
}