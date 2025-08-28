import './App.css';
import React from 'react';
import Header from "./components/Header";
import TaskList from './components/TaskList';


export default function App(){
  return (
    <section>
      <Header />
      <div className='container'>
        <TaskList />
      </div>
    </section>
  )
}