import './TaskList.css';
import Task from './Task.js';
function TaskList(){
    return(
    <div className='tasks'>
        <Task content="do groceries"/>
        <Task content="fix code"/>
        <Task content="drive to Dallas"/>
        <Task content="apply to Meta"/>
    </div>
    );
}

export default TaskList;