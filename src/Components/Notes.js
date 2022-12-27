import React, { useContext } from 'react';
import noteContext from '../Context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
	const context = useContext(noteContext);
	const { notes, addNote } = context;
	return (
		<>
			<AddNote />
			<div className="row my-3">
				<h3>Your notes</h3>
				{notes.map((note) => {
					return <NoteItem key={note._id} note={note} />;
				})}
			</div>
		</>
	);
}

export default Notes;
