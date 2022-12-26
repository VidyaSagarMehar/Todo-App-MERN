import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
	const s1 = {
		name: 'Cherry',
		class: '5c',
	};
	const [state, setState] = useState(s1);
	const update = () => {
		setTimeout(() => {
			setState({
				name: 'Vidya',
				class: '6a',
			});
		}, 1000);
	};
	return (
		<NoteContext.Provider value={{ state, update }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
