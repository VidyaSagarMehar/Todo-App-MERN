import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
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

	//  Add a Note
	const addNote = (title, description, tag) => {
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
	const deleteNote = () => {};

	// Edit a Note
	const editNote = () => {};

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
