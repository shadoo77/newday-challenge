import React, { Component } from 'react';
import userData from '../data/users.json';
import itemsStock from '../data/itemsStock.json';
import NavBar from './navBar';
import { Alert, Button, Modal, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

class Home extends Component {
	state = {
		userInfo: {},
		items: itemsStock,
		totalCost: 0,
		values: [],
		prices: [],
		modal: false,
		alert: false
	};

	validation(num) {
		const numRegex = /^\d+$/;
		const numCheck = num.match(numRegex);
		if (num === '' || numCheck) return true;
		else return false;
	}

	toggle = () => {
		this.setState((prevState) => ({
			modal: !prevState.modal
		}));
	};

	increment = (pricePerUnit, i) => {
		let values = [ ...this.state.values ];
		let temp = values[i];
		if (!temp) {
			temp = 0;
		}
		temp++;
		values[i] = temp;

		let items = [ ...this.state.items ];
		let currItem = items[i].available - 1;
		items[i].available = currItem;

		let prices = [ ...this.state.prices ];
		values[i] = temp;
		prices[i] = temp * pricePerUnit;
		this.setState({ values, prices });
		this.retrieveTotalCost(prices);
	};

	decrement = (pricePerUnit, i) => {
		let values = [ ...this.state.values ];
		let temp = values[i];
		if (temp > 0) {
			temp--;
			values[i] = temp;

			let items = [ ...this.state.items ];
			let currItem = items[i].available + 1;
			items[i].available = currItem;

			let prices = [ ...this.state.prices ];
			values[i] = temp;
			prices[i] = temp * pricePerUnit;
			this.setState({ values, prices });
			this.retrieveTotalCost(prices);
		}
	};

	showStockItems = () => {
		return this.state.items.map((item, i) => {
			return (
				<Row className="single-item-row" key={'item' + i}>
					<Col>
						<div className="img-item">
							<div>
								<img src={'./images/' + item.imgSrc} alt={item.itemName} />
							</div>
							<div>
								<span>
									<div>
										{item.itemName} <br />
										<span style={{ color: 'red' }}>{item.available + ' '}</span>
										<span style={{ color: 'green' }}> op voorraad</span>
									</div>
								</span>
							</div>
						</div>
					</Col>
					<Col>
						<section className="amount-area">
							<div className="icon-wraapper" onClick={() => this.decrement(item.pricePerUnit, i)}>
								<img src="./icons/minus.png" alt="decr" />
							</div>
							<div>
								<input
									type="text"
									value={this.state.values[i] || ''}
									onChange={(e) => this.handleChange(e, item.pricePerUnit, i)}
									onBlur={(e) => this.handleBlur(e, i)}
								/>
							</div>
							<div className="icon-wraapper" onClick={() => this.increment(item.pricePerUnit, i)}>
								<img src="./icons/plus.png" alt="incr" />
							</div>
							<div style={{ marginLeft: 20 }}>{item.pricePerUnit} gold</div>
						</section>
					</Col>
				</Row>
			);
		});
	};

	retrieveTotalCost(prices) {
		let temp = 0;
		temp = prices.reduce((prev, next) => {
			if (!next) next = 0;
			return prev + next;
		}, 0);
		this.setState({ totalCost: temp });
	}

	handleChange = (e, pricePerUnit, i) => {
		const isValid = this.validation(e.target.value);
		if (isValid) {
			let values = [ ...this.state.values ];
			let prices = [ ...this.state.prices ];
			values[i] = e.target.value;
			prices[i] = e.target.value * pricePerUnit;
			this.setState({ values, prices });
			this.retrieveTotalCost(prices);
		}
	};

	handleBlur = (e, i) => {
		let items = [ ...this.state.items ];
		let currItem = items[i].available - e.target.value;
		items[i].available = currItem;
		this.setState({ items });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.userInfo.goldCoins >= this.state.totalCost) {
			const obj = this.state.userInfo;
			obj.goldCoins = this.state.userInfo.goldCoins - this.state.totalCost;
			this.setState({
				userInfo: obj,
				modal: !this.state.modal
			});
		} else {
			this.setState({ alert: true });
		}
	};

	alertClass() {
		return this.state.alert ? 'show-alert' : 'hide-alert';
	}

	async componentDidMount() {
		const userName = localStorage.getItem('auth-user');
		const userInfo = userData.filter((el) => el.name === userName);
		const values = [];
		for (var i = 0; i < itemsStock.length; i++) {
			values.push(0);
		}
		this.setState({ userInfo: userInfo[0], values });
	}
	render() {
		return (
			<React.Fragment>
				<NavBar userInfo={this.state.userInfo} dialogTurn={this.toggle} />
				<section style={{ float: 'left' }}>
					<h2>Hello {this.state.userInfo.name},</h2>
					<p style={{ color: 'gray' }}>have a nice day</p>
				</section>
				<div className="buy-dialog">
					<form onSubmit={this.handleSubmit}>
						<Modal isOpen={this.state.modal} className="modal-dialog-centered">
							<div className="dialog-header">
								<span>Order</span>
								<span onClick={this.toggle}>
									<img src="./icons/cross.png" alt="close" />
								</span>
							</div>
							<ModalBody>{this.showStockItems()}</ModalBody>
							<div className="total-cost">
								<span>Total</span>
								<span>{this.state.totalCost}</span>
							</div>
							<Alert color="danger" className={this.alertClass()}>
								You don't have enough gold coins, you have just{' '}
								<strong>{this.state.userInfo.goldCoins}</strong> golden coins!
							</Alert>
							<ModalFooter>
								<Button color="secondary" onClick={this.toggle}>
									Cancel
								</Button>
								<Button color="primary" onClick={this.handleSubmit}>
									Buy
								</Button>
							</ModalFooter>
						</Modal>
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
