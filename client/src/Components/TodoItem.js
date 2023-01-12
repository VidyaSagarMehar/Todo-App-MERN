import React, { useContext } from 'react';
import todoContext from '../Context/todos/TodoContext';

function TodoItem(props) {
	const context = useContext(todoContext);
	const { deleteTodo } = context;

	const { todo, updateTodo } = props;
	const date = new Date(todo.date);
	const formattedDate = date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const formattedTime =
		date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

	return (
		<div className="col-md-3 my-1">
			<div className="card">
				<div className="card-body">
					<div className="d-flex inline align-items-center justify-content-between">
						<h5 className="card-title">{todo.title}</h5>{' '}
						<span>
							<i
								className="fa-solid fa-trash mx-2"
								onClick={() => {
									deleteTodo(todo._id);
									props.showAlert('Deleted successfully', 'success');
								}}
							></i>
							<i
								className="fa-solid fa-pen mx-2"
								onClick={() => {
									updateTodo(todo);
								}}
							></i>
						</span>
					</div>
					<p className="card-text">{todo.description}</p>
					<span className="fs-6 fw-lighter d-flex justify-content-between">
						<p>{formattedTime}</p>
						<p>{formattedDate}</p>
					</span>
				</div>
			</div>
		</div>
	);
}

export default TodoItem;
