import '../styles/TaskList.css';
import Task from './Task.js';


function TaskList( {tasks, onDelete, onEdit, setTaskToDelete, setTaskToEdit, onComplete} ){
    return (
    <>
        <div className='tasks'> 
            {tasks.map(task => (
                <Task
                    task = {task}
                    key = {task._id || task.id} //React has a key for each component
                    content = {task.content}
                    onDelete={() => onDelete(task)}
                    onEdit={() => onEdit(task)}
                    onComplete={() => onComplete(task._id)}
                />
            ))}
        </div>
    </>
    );
}

export default TaskList;