import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';

function App() {
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert message={'This is amazing Alert bar'} />
					<div className="container">
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/about">
								<About />
							</Route>
						</Switch>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
