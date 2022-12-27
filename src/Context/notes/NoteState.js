import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
	const notesInitial = [
		{
			_id: '63a86be775f495d7abc29ef0',
			user: '63a7480c9a5374efc571cc19',
			title: 'First title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:35.970Z',
			__v: 0,
		},
		{
			_id: '63a86be875f495d7abc29ef2',
			user: '63a7480c9a5374efc571cc19',
			title: 'second title',
			description: 'First description',
			tag: 'personal',
			date: '2022-12-25T15:27:36.136Z',
			__v: 0,
		},
	];
	const [notes, setNotes] = useState(notesInitial);

	return (
		<NoteContext.Provider value={{ notes, setNotes }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
