import {cart, calculateCartQuantity} from "../../data/cart.js";
import {getDeliveryItems} from "../../data/deliveryOption.js";
import {fixedPrice} from "../../fixed/fixedPrice.js"

export function renderPaymentSummary()
{
    let html = '';
    let deliveryPrice = 0;

    cart.forEach((cartItems) => 
    {
      const product = getDeliveryItems(cartItems.deliveryId);

      deliveryPrice += product.priceCents;
    });


    html = `
            <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$42.75</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${fixedPrice(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
            `

    document.querySelector('.js-payment-summary').innerHTML = html;
}