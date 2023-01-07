import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login(props) {
	const [credentials, setCredentials] = useState({ email: '', password: '' });

	let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(
			`https://todo-app-mern-production-0118.up.railway.app/api/auth/login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: credentials.email,
					password: credentials.password,
				}),
			},
		);
		const json = await response.json();
		console.log(json);
		if (json.success) {
			//Save the auth token and redirect
			localStorage.setItem('token', json.authToken);
			props.showAlert('Logged in successfully', 'success');
			history.push('/');
		} else {
			props.showAlert('Inavlid credentials', 'danger');
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div className="container text-light">
			<form onSubmit={handleSubmit} className="col">
				<div className="mb-3 col-md-6">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						onChange={onChange}
						value={credentials.email}
						type="email"
						className="form-control"
						name="email"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3 col-md-6">
					<label htmlFor="password1" className="form-label">
						Password
					</label>
					<input
						onChange={onChange}
						value={credentials.password}
						type="password"
						className="form-control"
						name="password"
						id="exampleInputPassword1"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Login;
