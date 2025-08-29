import './TaskList.css';
import Task from './Task.js';


function TaskList( {tasks, onDelete, setTaskToDelete} ){
    return (
        <div className='tasks'>
            {tasks.map(task => (
                <Task
                    key = {task.id}
                    content = {task.content}
                    onDelete={() => onDelete(task)}
                />
            ))}
        </div>
    );
}

export default TaskList;