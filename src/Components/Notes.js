import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	useEffect(() => {
		getNotes();
	}, []);

	const ref = useRef(null);
	const refClose = useRef(null);
	const [note, setNote] = useState({
		id: '',
		etitle: '',
		edescription: '',
		etag: '',
	});

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
	};

	const handleClick = (e) => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
		refClose.current.click();
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<AddNote />

			{/* Modal starts here */}
			<button
				ref={ref}
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				Launch demo modal
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit Note
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="etitle" className="form-label">
										Title
									</label>
									<input
										minLength={5}
										required
										value={note.etitle}
										type="text"
										className="form-control"
										id="etitle"
										name="etitle"
										aria-describedby="emailHelp"
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="edescription" className="form-label">
										Descripion
									</label>
									<input
										minLength={5}
										required
										value={note.edescription}
										type="text"
										className="form-control"
										id="edescription"
										name="edescription"
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="etag" className="form-label">
										Tag
									</label>
									<input
										minLength={5}
										required
										value={note.etag}
										type="text"
										className="form-control"
										id="etag"
										name="etag"
										onChange={onChange}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								ref={refClose}
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								disabled={note.etitle.length < 5 || note.edescription < 5}
								type="button"
								className="btn btn-primary"
								onClick={handleClick}
							>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* End of modals */}

			<div className="row my-3">
				<h3>Your notes</h3>
				<div className="container">
					{notes.length === 0 && 'No Notes to display'}
				</div>
				{notes.map((note) => {
					return (
						<NoteItem key={note._id} updateNote={updateNote} note={note} />
					);
				})}
			</div>
		</>
	);
}

export default Notes;
