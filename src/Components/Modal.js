import { useRef } from 'react';

const Modal = ({closeModal, addTask}) =>{
    const taskRef = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(taskRef.current.value.trim() === '') return;
        addTask({title: taskRef.current.value, id: Math.random().toString(), done: false});
        taskRef.current.value = '';
        closeModal();
    }

    return <div className="modal-container">
        <div className="modal" onClick={closeModal}></div>

        <div className="form-container">
            <i className="fa fa-times" aria-hidden="true" onClick={closeModal}></i>
            <form onSubmit={handleSubmit}>
                <center> <h1>New Task</h1> </center>
                <input type='text' placeholder='What are you doing today?' ref={taskRef} autoFocus/>

                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
}

export default Modal;