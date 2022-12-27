import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	// Local Storage Implementation
	const useLocalStorage = cartInit => {
		const [cart, setCart] = useState(() => {
			const localCart = window.localStorage.getItem('cart')
			return localCart ? JSON.parse(localCart) : cartInit
		});
		const setValue = value => {
			setCart(value)
			window.localStorage.setItem('cart', JSON.stringify(value))
		}
		return [cart, setValue]
	}
	const [cart, setCart] = useLocalStorage([])
	const [products] = useState(data);


	const addItem = item => {
		if (cart.length>0) {
      // const cartCopy = { ...cart }; THIS DOES NOT WORK
      // const cartCopy = Object.assign({}, cart); NOR DOES THIS
      const cartCopy = JSON.parse(JSON.stringify(cart)); // THIS DOES WORK, BUT Y DOESN'T ABOVE WORK?
      console.log('cartCopy in addItem', cartCopy)
			let flag = true
			for (let cartItem of cartCopy) {
				if (cartItem.id===item.id) {
					cartItem.quantity++
					flag = false
				}
			}
			if (flag) {
				item.quantity = 1
				cartCopy.push(item)
			}
			setCart(cartCopy)
		} else {
			item.quantity = 1
			setCart([item]);
		}
	};
	const removeItem = itemId => {
		const newCart = cart.filter(item => item.id!==itemId)
		setCart(newCart);
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
				<CartContext.Provider value={{cart, removeItem}}>
					<Navigation/>

					{/* Routes */}
					<Route
						exact
						path="/"
						component={Products}
					/>

					<Route
						path="/cart"
						component={ShoppingCart}
					/>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
