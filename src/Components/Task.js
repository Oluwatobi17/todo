import { useState } from "react";

const Task = ({data, deleteTask, editTask, checkTask}) =>{
    const [title, setTitle] = useState(data.title);

    const editHandler = (e) => {
        setTitle(e.target.value);
        editTask({...data, title: e.target.value});
    }

    return <div className="task-container">
        <input type='checkbox' onChange={()=>checkTask(data.id)} checked={data.done}/>
        <input 
        type='text' className="task" placeholder='Task' value={title}
         onChange={editHandler}
     />
        <i className="fa fa-trash" onClick={()=>deleteTask(data.id)} aria-hidden="true"></i>
    </div>
}


export default Task;