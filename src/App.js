import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/about">
						<About />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
