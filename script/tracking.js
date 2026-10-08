import { getProduct } from "../data/cart.js";
import {getOrder} from "../data/order.js";
import { getDeliveryItems } from "../data/deliveryOption.js";
import datejs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

renderTracking();

function renderTracking()
{
    let trackingHTML = '';

    const url = new URL(window.location.href);

    const productId = url.searchParams.get('productId');

    const product = getProduct(productId);

    const order = getOrder(productId);

    const deliveryItem = getDeliveryItems(order.deliveryId);

    const today = datejs();

    const date = today.add(deliveryItem.day, 'days'); 

    const deliveryDate = date.format('dddd MMMM, D');

    trackingHTML = ` 
                    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${order.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
                    `

    document.querySelector('.js-tracking-main').innerHTML = trackingHTML;

    document.querySelector('.js-search-button').addEventListener('click', () => 
    {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `index.html?search=${search}`;
    })

    document.body.addEventListener('keydown', (event) => 
    {
      if(event.key === 'Enter')
      {
        document.querySelector('.js-search-button').click();
      }
    })

}    