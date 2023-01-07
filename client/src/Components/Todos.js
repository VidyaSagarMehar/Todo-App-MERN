import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import todoContext from '../Context/todos/TodoContext';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

function Todos(props) {
	const context = useContext(todoContext);
	let history = useHistory();
	const { todos, getTodos, editTodo } = context;
	useEffect(() => {
		if (localStorage.getItem('token')) {
			getTodos();
		} else {
			history.push('login');
		}
	}, []);

	const ref = useRef(null);
	const refClose = useRef(null);
	const [todo, setTodo] = useState({
		id: '',
		etitle: '',
		edescription: '',
		etag: '',
	});

	const updateTodo = (currentTodo) => {
		ref.current.click();
		setTodo({
			id: currentTodo._id,
			etitle: currentTodo.title,
			edescription: currentTodo.description,
			etag: currentTodo.tag,
		});
	};

	const handleClick = (e) => {
		editTodo(todo.id, todo.etitle, todo.edescription, todo.etag);
		refClose.current.click();
		props.showAlert('Updated sucessfully', 'success');
	};
	const onChange = (e) => {
		setTodo({ ...todo, [e.target.name]: e.target.value });
	};

	return (
		<>
			<AddTodo showAlert={props.showAlert} />

			{/* Modal starts here */}
			<button
				ref={ref}
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				Launch demo modal
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit Todo
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="etitle" className="form-label">
										Title
									</label>
									<input
										minLength={5}
										required
										value={todo.etitle}
										type="text"
										className="form-control"
										id="etitle"
										name="etitle"
										aria-describedby="emailHelp"
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="edescription" className="form-label">
										Descripion
									</label>
									<input
										minLength={5}
										required
										value={todo.edescription}
										type="text"
										className="form-control"
										id="edescription"
										name="edescription"
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="etag" className="form-label">
										Tag
									</label>
									<input
										minLength={5}
										required
										value={todo.etag}
										type="text"
										className="form-control"
										id="etag"
										name="etag"
										onChange={onChange}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								ref={refClose}
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								disabled={todo.etitle.length < 5 || todo.edescription < 5}
								type="button"
								className="btn btn-primary"
								onClick={handleClick}
							>
								Update Todo
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* End of modals */}

			<div className="row my-3">
				<h3 className=" text-light">Your todos</h3>
				<div className="container text-light">
					{todos.length === 0 && 'No Todos to display'}
				</div>
				{todos.map((todo) => {
					return (
						<TodoItem
							key={todo._id}
							updateTodo={updateTodo}
							todo={todo}
							showAlert={props.showAlert}
						/>
					);
				})}
			</div>
		</>
	);
}

export default Todos;
