import React, { useState, useContext } from 'react';
import todoContext from '../Context/todos/TodoContext';
import UserProfile from './UserProfile';

function AddTodo(props) {
	const context = useContext(todoContext);
	const { addTodo } = context;

	const [todo, setTodo] = useState({
		title: '',
		description: '',
		tag: '',
	});

	const handleClick = (e) => {
		e.preventDefault();
		addTodo(todo.title, todo.description, todo.tag);
		setTodo({
			title: '',
			description: '',
			tag: '',
		});
		props.showAlert('Added successfully', 'success');
	};

	const onChange = (e) => {
		setTodo({ ...todo, [e.target.name]: e.target.value });
	};
	return (
		<div className="row">
			<div className="container text-light col-10">
				<h2>Add a todo</h2>
				<form className="col">
					<div className="mb-3 sm-5 col-md-6">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							value={todo.title}
							minLength={5}
							required
							type="text"
							className="form-control"
							id="title"
							name="title"
							aria-describedby="emailHelp"
							onChange={onChange}
						/>
					</div>
					<div className="mb-3 col-md-6">
						<label htmlFor="description" className="form-label">
							Descripion
						</label>
						<input
							value={todo.description}
							minLength={5}
							required
							type="text"
							className="form-control"
							id="description"
							name="description"
							onChange={onChange}
						/>
					</div>
					{/* <div className="mb-3 col-sm">
					<label htmlFor="tag" className="form-label">
						Tag
					</label>
					<input
						value={todo.tag}
						minLength={5}
						required
						type="text"
						className="form-control"
						id="tag"
						name="tag"
						onChange={onChange}
					/>
				</div> */}

					<button
						disabled={todo.title.length < 5 || todo.description < 5}
						type="submit"
						className="btn btn-primary"
						onClick={handleClick}
					>
						Add Todo
					</button>
				</form>
			</div>
			<div className="col-2">
				<UserProfile />
			</div>
		</div>
	);
}

export default AddTodo;
