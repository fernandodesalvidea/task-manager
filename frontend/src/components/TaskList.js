import '../styles/TaskList.css';
import Task from './Task.js';


function TaskList( {tasks, onDelete, onEdit, setTaskToDelete, setTaskToEdit, onComplete} ){
    return (
    <>
        <div className='tasks'>
            {tasks.map(task => (
                <Task
                    key = {task._id || task.id}
                    content = {task.content}
                    onDelete={() => onDelete(task)}
                    onEdit={() => onEdit(task)}
                    onComplete={() => {
                        onComplete(task.done)
                        console.log(`${task.content} marked done!`)
                    }}
                />
            ))}
        </div>
    </>
    );
}

export default TaskList;