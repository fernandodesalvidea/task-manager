import '../styles/Task.css';
import { MdModeEdit } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { FaTrashAlt } from "react-icons/fa";

function Task({content, onDelete, onEdit, onComplete, task}){
    return(
    <div className={task.done ? 'task done' : 'task'}>
    <div className='done'>
        {content}
     </div>
        <div className='right'>
            <button type='button' id='done' onClick={onComplete}><GiCheckMark /></button>
            <button type='button' id='edit'onClick={onEdit}><MdModeEdit /></button>
            <button type='button' id='delete' onClick={onDelete}><FaTrashAlt /></button>
        </div>
    </div>
    );
}

export default Task;