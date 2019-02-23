import React from 'react';
import history from '../../history';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
	const goldCoins = props.userInfo.goldCoins;
	return (
		<Navbar color="dark" dark expand="sm">
			<Nav className="mr-auto navbar-item" navbar>
				<NavItem>
					<NavLink href="#">Home</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						href="#"
						onClick={() => {
							props.dialogTurn();
						}}
					>
						Buy
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="#">Stocks</NavLink>
				</NavItem>
			</Nav>
			<Nav className="ml-auto navbar-item" navbar>
				<NavItem>
					<NavLink>Credits : {goldCoins}</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						href="#"
						onClick={() => {
							localStorage.removeItem('auth-user');
							history.push('/login');
						}}
					>
						Logout
					</NavLink>
				</NavItem>
			</Nav>
		</Navbar>
	);
};

export default NavBar;
