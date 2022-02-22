import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KVmYdJb19artIgyHOl4BSNE0CVNECwtOAwOSaVYJAjBP14uEysGnrfdsDZLFvugzyFD2zn3bz7W17fizzL10EGG00jgIstEUQ';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total price is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken} // the onSuccess callback that triggers when we submit (for us will be just an alert)
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;