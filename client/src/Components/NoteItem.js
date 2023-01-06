import React, { useContext } from 'react';
import noteContext from '../Context/notes/NoteContext';

function NoteItem(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;

	const { note, updateNote } = props;
	return (
		<div className="col-md-3 my-1">
			<div className="card">
				<div className="card-body">
					<div className="d-flex inlinealign-items-center">
						<h5 className="card-title">{note.title}</h5>{' '}
						<i
							className="fa-solid fa-trash mx-2"
							onClick={() => {
								deleteNote(note._id);
								props.showAlert('Deleted successfully', 'success');
							}}
						></i>
						<i
							className="fa-solid fa-pen mx-2"
							onClick={() => {
								updateNote(note);
							}}
						></i>
					</div>
					<p className="card-text">{note.description}</p>
				</div>
			</div>
		</div>
	);
}

export default NoteItem;
