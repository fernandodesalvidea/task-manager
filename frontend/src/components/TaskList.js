import './TaskList.css';
import Task from './Task.js';


function TaskList( {tasks, onDelete, onEdit, setTaskToDelete, setTaskToEdit} ){
    return (
    <>
        <div className='tasks'>
            {tasks.map(task => (
                <Task
                    key = {task.id}
                    content = {task.content}
                    onDelete={() => onDelete(task)}
                    onEdit={() => onEdit(task)}
                />
            ))}
        </div>
    </>
    );
}

export default TaskList;