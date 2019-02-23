import React, { Component } from 'react';
import { Button } from 'reactstrap';
import history from '../history';

class Login extends Component {
	state = {
		users: [ 'Shadi', 'Tim', 'Peter', 'Random' ],
		selectUser: 'default',
		feedBackDiv: false
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.selectUser === 'default') {
			this.setState({ feedBackDiv: true });
		} else {
			this.setState({ feedBackDiv: false });
			localStorage.setItem('auth-user', this.state.selectUser);
			history.push('/');
		}
	};

	feedBack = () => {
		let feedBack = 'text-danger';
		feedBack += this.state.feedBackDiv ? ' show-feedback' : ' hidden-feedback';
		return feedBack;
	};

	render() {
		return (
			<React.Fragment>
				<div>Login here</div>
				<form className="login-form" onSubmit={this.handleSubmit}>
					<select
						className="m-2"
						name="selectUser"
						value={this.state.selectUser}
						onChange={this.handleChange}
					>
						<option key="defaultOption" value="default">
							Select user
						</option>
						{this.state.users.map((user, i) => {
							return (
								<option key={'option' + i} value={user}>
									{user}
								</option>
							);
						})}
					</select>
					<Button color="primary m-2">Log in</Button>
					<div className={this.feedBack()}>Select a valid user please!</div>
				</form>
			</React.Fragment>
		);
	}
}

export default Login;
