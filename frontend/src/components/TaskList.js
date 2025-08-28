import './TaskList.css';
import Task from './Task.js';


function TaskList( {tasks} ){
    return (
        <div className='tasks'>
            {tasks.map(task => (
                <Task content={task.content} key = {task.id}></Task>
            ))}
        </div>
    );
}

export default TaskList;