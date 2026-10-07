import {orders,calculateOrderQuantity} from "../data/order.js";
import { getProduct} from "../data/cart.js";
import datejs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getDeliveryItems } from "../data/deliveryOption.js";
import { fixedPrice } from "../fixed/fixedPrice.js";

renderOrder();

document.querySelector('.js-quantity').innerHTML = calculateOrderQuantity();

export function renderOrder()
{
    let html = '';

    orders.forEach((order) => 
    {
        const product = getProduct(order.productId);

        const deliveryItem = getDeliveryItems(order.deliveryId);

        const today = datejs();

        const total = product.priceCents * order.quantity;

        const orderDate = today.format('dddd MMMM, D');

        const deliveryDate = today.add(deliveryItem.day, 'days');

        const date = deliveryDate.format('dddd MMMM, D');

        html += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${fixedPrice(total)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${product.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${date}
              </div>
              <div class="product-quantity">
                Quantity: ${order.quantity}
              </div>
              <button class="buy-again-button button-primary" data-order-id = ${product.id}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${product.id}"
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
                `
    })

    document.querySelector('.js-orders-grid').innerHTML = html;

    document.querySelectorAll('.js-track-button').forEach((trackButton) => 
    {
      trackButton.addEventListener('click', () =>
      {
        const orderId = trackButton.dataset.orderId;
        renderOrder();
        console.log(orderId);
      })
    })
}