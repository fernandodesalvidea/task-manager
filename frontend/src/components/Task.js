import './Task.css';
import { MdModeEdit } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function Task({content, onDelete, onEdit}){
    return(
    <div className='task'>
        {content}
        <div className='right'>
            <button type='button' id='done'><IoIosCheckmarkCircle /></button>
            <button type='button' id='edit'onClick={onEdit}><MdModeEdit /></button>
            <button type='button' id='delete' onClick={onDelete}><FaTrashAlt />
            </button>
        </div>
    </div>
    );
}

export default Task;