import Todos from './Todos';

function Home(props) {
	const { showAlert } = props;
	return (
		<div>
			<Todos showAlert={showAlert} />
		</div>
	);
}

export default Home;
