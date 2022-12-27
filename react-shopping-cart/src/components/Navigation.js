import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '../contexts/CartContext';

const Navigation = () => {
	const { cart } = useContext(CartContext);
	const qty = cart.reduce( (total, curr) => {
		return total+curr.quantity
	}, 0)
	return (
		<div className="navigation">
			<NavLink to="/">Products</NavLink>
			<NavLink to="/cart">
				Cart <span>{qty}</span>
			</NavLink>
		</div>
	);
};

export default Navigation;
