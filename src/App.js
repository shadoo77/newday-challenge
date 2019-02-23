import React, { Component } from 'react';
import './App.css';
import './styles/index.css';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/auth';
import Login from './components/login';
import Home from './components/shop/home';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="site-container">
					<Switch>
						<Route path="/login" component={Login} />
						<Auth>
							<Route path="/" component={Home} exact />
						</Auth>
						<Route exact render={() => <h2>This page is not found!</h2>} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
