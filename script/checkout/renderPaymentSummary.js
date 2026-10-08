import {cart, calculateCartQuantity,getProduct} from "../../data/cart.js";
import {getDeliveryItems} from "../../data/deliveryOption.js";
import { addOrder } from "../../data/order.js";
import {fixedPrice} from "../../fixed/fixedPrice.js";

export function renderPaymentSummary()
{
    let html = '';
    let deliveryPrice = 0;
    let matchingProduct;
    let price = 0;

    cart.forEach((cartItems) => 
    {
      const product = getDeliveryItems(cartItems.deliveryId);

      matchingProduct = getProduct(cartItems.productId);

      price += (matchingProduct.priceCents * cartItems.quantity);

      deliveryPrice += product.priceCents;
    });

    const totalPriceBeforeTax = price + deliveryPrice;
    const estimatedTax = totalPriceBeforeTax * 0.1;
    const orderTotal = estimatedTax + totalPriceBeforeTax;

    html = `
            <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${fixedPrice(price)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${fixedPrice(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${fixedPrice(totalPriceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${fixedPrice(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${fixedPrice(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order" data-order-Id = ${cartItems.productId}>
            Place your order
          </button>
            `

    document.querySelector('.js-payment-summary').innerHTML = html;

    document.querySelector('.js-place-order').addEventListener('click', () => 
    {
      cart.forEach((cartItems) => 
      {
        addOrder(cartItems);
      })

      window.location = "orders.html";
    })
}