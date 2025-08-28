import './App.css';
import Task from './components/TaskList';
import React from 'react';
import { useState } from 'react';
import Header from "./components/Header";
import TaskList from './components/TaskList';


export default function App(){
  return (
    <section>
      <Header />
      <TaskList />
    </section>
  )
}