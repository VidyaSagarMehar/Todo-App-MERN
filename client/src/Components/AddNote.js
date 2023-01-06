import React, { useState, useContext } from 'react';
import noteContext from '../Context/notes/NoteContext';

function AddNote(props) {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({
		title: '',
		description: '',
		tag: '',
	});

	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({
			title: '',
			description: '',
			tag: '',
		});
		props.showAlert('Added successfully', 'success');
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<div className="container">
			<h2>Add a note</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						value={note.title}
						minLength={5}
						required
						type="text"
						className="form-control"
						id="title"
						name="title"
						aria-describedby="emailHelp"
						onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Descripion
					</label>
					<input
						value={note.description}
						minLength={5}
						required
						type="text"
						className="form-control"
						id="description"
						name="description"
						onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="tag" className="form-label">
						Tag
					</label>
					<input
						value={note.tag}
						minLength={5}
						required
						type="text"
						className="form-control"
						id="tag"
						name="tag"
						onChange={onChange}
					/>
				</div>

				<button
					disabled={note.title.length < 5 || note.description < 5}
					type="submit"
					className="btn btn-primary"
					onClick={handleClick}
				>
					Add Note
				</button>
			</form>
		</div>
	);
}

export default AddNote;
