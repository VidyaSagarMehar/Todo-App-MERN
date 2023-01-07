import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup(props) {
	const [credentials, setCredentials] = useState({
		name: '',
		email: '',
		password: '',
		cpassword: '',
	});

	let history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();

		const { name, email, password } = credentials;

		const response = await fetch(
			`https://todo-app-mern-production-0118.up.railway.app/api/auth/createuser`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			},
		);
		const json = await response.json();
		console.log(json);
		if (json.success) {
			//Save the auth token and redirect
			localStorage.setItem('token', json.authToken);
			history.push('/');
			props.showAlert('Account created successfully', 'success');
		} else {
			props.showAlert('Inavlid input details', 'danger');
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<div className="container text-light">
			<form onSubmit={handleSubmit} className="col">
				<div className="mb-3 col-md-6">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						name="name"
						type="text"
						className="form-control"
						id="name"
						aria-describedby="emailHelp"
						onChange={onChange}
					/>
				</div>
				<div className="mb-3 col-md-6">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						name="email"
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						onChange={onChange}
					/>
				</div>
				<div className="mb-3 col-md-6">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						name="password"
						type="password"
						className="form-control"
						id="password"
						onChange={onChange}
						minLength={5}
						required
					/>
				</div>
				<div className="mb-3 col-md-6">
					<label htmlFor="cpassword" className="form-label">
						Confirm Password
					</label>
					<input
						name="cpassword"
						type="password"
						className="form-control"
						id="cpassword"
						onChange={onChange}
						minLength={5}
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default Signup;
