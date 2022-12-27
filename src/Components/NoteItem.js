import React from 'react';

function NoteItem(props) {
	const { note } = props;
	return (
		<div className="col-md-3 my-1">
			<div className="card">
				<div className="card-body">
					<div className="d-flex inlinealign-items-center">
						<h5 className="card-title">{note.title}</h5>{' '}
						<i className="fa-solid fa-trash mx-2 float-right"></i>
						<i className="fa-solid fa-pen mx-2"></i>
					</div>
					<p className="card-text">{note.description}</p>
				</div>
			</div>
		</div>
	);
}

export default NoteItem;
