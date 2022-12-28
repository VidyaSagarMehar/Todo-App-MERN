import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup() {
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

		const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			//Save the auth token and redirect
			localStorage.setItem('token', json.authtoken);
			history.push('/');
		} else {
			alert('Invalid Credential');
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
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
				<div className="mb-3">
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
				<div className="mb-3">
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
				<div className="mb-3">
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
