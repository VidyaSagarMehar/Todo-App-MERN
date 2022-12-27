import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
	const host = 'http://localhost:5000';

	const notesInitial = [
		{
			_id: '63a86be775fdtagjh495d7abac29ef0',
			user: '63a7480c9a5374efc571cc19',
			title: 'First title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:35.970Z',
			__v: 0,
		},
		{
			_id: '63a86be875f49,khgj5ad7abc29ef2',
			user: '63a7480c9a5374efc571cc19',
			title: 'second title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:36.136Z',
			__v: 0,
		},
		{
			_id: '63a86be875f4a9534yhhdd7abc29ef2',
			user: '63a7480c9a5374efc571cc19',
			title: 'second title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:36.136Z',
			__v: 0,
		},
		{
			_id: '63a86be875sjhgf495da7abc29ef2',
			user: '63a7480c9a5374efc571cc19',
			title: 'second title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:36.136Z',
			__v: 0,
		},
		{
			_id: '63a86be875f445g9a5d7abc29ecf2',
			user: '63a7480c9a5374efc571cc19',
			title: 'second title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:36.136Z',
			__v: 0,
		},
		{
			_id: '63a86be875f4yrt95d7aabc29ef2',
			user: '63a7480c9a5374efc571cc19',
			title: 'second title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:36.136Z',
			__v: 0,
		},
	];

	const [notes, setNotes] = useState(notesInitial);

	//  Get all  Notes
	const getNotes = async () => {
		// API call
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNzQ4MGM5YTUzNzRlZmM1NzFjYzE5In0sImlhdCI6MTY3MTk4MTM3Mn0.BlrOsJR8ddsgJYRZK9cvTGWYoRZt1ieGm8S4ievpYbo',
			},
		});
		const json = await response.json();
		console.log(json);
		setNotes(json);
	};

	//  Add a Note
	const addNote = async (title, description, tag) => {
		// API call
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNzQ4MGM5YTUzNzRlZmM1NzFjYzE5In0sImlhdCI6MTY3MTk4MTM3Mn0.BlrOsJR8ddsgJYRZK9cvTGWYoRZt1ieGm8S4ievpYbo',
			},
			body: JSON.stringify({ title, description, tag }),
		});

		console.log('Addding a new note');
		const note = {
			_id: '63a86be8df3475f234495d7aabc29ef2',
			user: '63a7480c9a5374efc571cc19',
			title: title,
			description: description,
			tag: tag,
			date: '2022-12-25T15:27:36.136Z',
			__v: 0,
		};
		setNotes(notes.concat(note));
	};
	// Delete a Note
	const deleteNote = (id) => {
		console.log('Deleting the note with id' + id);
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	// Edit a Note in client side
	const editNote = async (id, title, description, tag) => {
		// API call
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNzQ4MGM5YTUzNzRlZmM1NzFjYzE5In0sImlhdCI6MTY3MTk4MTM3Mn0.BlrOsJR8ddsgJYRZK9cvTGWYoRZt1ieGm8S4ievpYbo',
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = response.json();

		// Logic to edit in client side
		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];
			if (element._id === id) {
				element.title = title;
				element.description = description;
				element.tag = tag;
			}
		}
	};

	return (
		<NoteContext.Provider
			value={{ notes, addNote, deleteNote, editNote, getNotes }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
