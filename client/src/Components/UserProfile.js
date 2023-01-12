import React, { useState, useEffect } from 'react';

function UserProfile() {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		const myRequest = new Request(
			'https://todo-app-mern-production-0118.up.railway.app/api/auth/getuser',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('token'),
				},
			},
		);
		fetch(myRequest)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setUserName(data.name);
				setUserEmail(data.email);
				// console.log(data.name);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<div className="card h-100 bg-transparent border border-4 border-primary text-center text-light rounded mt-2">
				<img
					src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
					className="card-img-top mx-auto my-2"
					alt="..."
					width="70px"
				/>
				<div className="card-body">
					<h5 className="card-title">{userName}</h5>
					<p className="card-text fs-6 fw-lighter">{userEmail}</p>
				</div>
			</div>
		</>
	);
}

export default UserProfile;
