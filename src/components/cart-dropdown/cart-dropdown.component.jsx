import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
      <CustomButton onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden()); // add dispatch toggleCartHidden action creator
      }}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// Wrap connect function with `withRouter`
// (higher order component returns component and also takes in component as an argument)
// withRouter will passes the match history and location objects into the component that is being wrapped.
export default withRouter(connect(mapStateToProps)(CartDropdown));


