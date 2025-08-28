import './Task.css';
import { MdModeEdit } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";


function Task({content, onDelete}){
    return(
    <div className='task'>
        {content}
        <div className='right'>
            <button type='button' id='done'><MdModeEdit /></button>
            <button type='button' id='edit'><IoIosCheckmarkCircle /></button>
            <button type='button' id='delete' onClick={onDelete}><FaTrashAlt />
            </button>
        </div>
    </div>
    );
}

export default Task;