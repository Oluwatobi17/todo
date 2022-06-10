import { useState, useEffect, useRef } from 'react';

import Task from './Components/Task';
import Modal from './Components/Modal';

const App = () =>{
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [progress, setProgress] = useState(0);
	const filterRef = useRef();

	// useEffect(()=>{
	// 	if(filterRef.current.value !== 'all'){
	// 		setInitialTasks(tasks);
	// 	}
	// }, [filterRef]);

	useEffect(()=>{
		let store = JSON.parse(localStorage.getItem('storedTasks'));
		if(store) setTasks(store);
	}, []);

	useEffect(()=>{
		localStorage.setItem('storedTasks', JSON.stringify(tasks));
	}, [tasks]);

	useEffect(()=>{
		let completed = 0;
		for(let i=0; i<tasks.length; i++){
			if(tasks[i].done) completed += 1;
		}

		if(completed===0) setProgress(0);
		else setProgress((completed/tasks.length)*100);
	}, [tasks]);

	const closeModalHandler = () =>{
		setIsModalOpen(prev => !prev);
	}

	const addTaskHandler = (data) =>{
		setTasks(prev => [data, ...prev]);
	}

	const deleteTaskHandler = (id) =>{
		const newtask = tasks.filter(task => task.id !== id);
		setTasks(newtask);
	}

	const editTaskHandler = (data) => {
		///const newtask = tasks.filter(task => task.id !== data.id);
		//setTasks([...newtask, data]);
		const newtask = tasks.map(task =>{
			if(task.id === data.id){
				return {...data}
			}else{
				return {...task}
			}
		});
		setTasks(newtask);
	}

	const checkTaskHandler = (id) => {
		const newtask = tasks.map(task =>{
			if(task.id === id){
				return {...task, done: !task.done}
			}else{
				return {...task}
			}
		});
		setTasks(newtask);
	}

	const filterHandler = (e) =>{
		const filter = filterRef.current.value;
		if(filter === 'completed'){
			const completed = tasks.filter(task => task.done);
			const uncompleted = tasks.filter(task => !task.done);
			setTasks([...completed, ...uncompleted]);
			console.log(completed);		
		}else if(filter === 'uncompleted'){
			const completed = tasks.filter(task => task.done);
			const uncompleted = tasks.filter(task => !task.done);
			setTasks([...uncompleted, ...completed]);
		}
	}

	return <>
		<div className="todo-container">
			{isModalOpen && <Modal closeModal={closeModalHandler} addTask={addTaskHandler} />}
			<center><h1>Tasks</h1></center>

			<div className="menu">
				<div>
					Filter By: 
					<select ref={filterRef} onChange={filterHandler}>
						<option value='all'>All</option>
						<option value='completed'>Completed</option>
						<option value='uncompleted'>Uncompleted</option>
					</select>
				</div>

				<button onClick={()=> setIsModalOpen(prev=> !prev)}>+</button>
			</div>
			{tasks.length!==0 && <center>{Math.round(progress)}%<progress value={progress} max={100}></progress></center>}
			
			{tasks?.map(task => <Task data={task} key={task.id} checkTask={checkTaskHandler} deleteTask={deleteTaskHandler} editTask={editTaskHandler} />)}
			{tasks.length===0 && <center>No task yet</center>}
		</div>
		<center> <p>2022 Copyright &copy; <a href='https://ganiuportfolio.vercel.app/' rel='norefferer'>
			Ganiu Ibrahim Olalekan</a></p> </center>
	</>
}

export default App;