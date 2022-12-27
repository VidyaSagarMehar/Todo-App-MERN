import React, { useContext } from 'react';
import noteContext from '../Context/notes/NoteContext';

function Notes() {
	const context = useContext(noteContext);
	const { notes, setNotes } = context;
	return (
		<div className="container">
			<h3>Your notes</h3>
			{notes.map((note) => {
				return note.title;
			})}
		</div>
	);
}

export default Notes;
