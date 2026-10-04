import { cart, getProduct, editQuantity, calculateCartQuantity, deleteItem, updateDeliveryOption} from "../data/cart.js";
import {deliveryOption} from "../data/deliveryOption.js"
import { fixedPrice } from "../fixed/fixedPrice.js";

renderOrderSummary();

function renderOrderSummary() {
    let checkoutHTML = '';

    cart.forEach((cartItems) => {
        const productId = cartItems.productId;

        const matchingProduct = getProduct(productId);

        // console.log(matchingProduct.id);

        checkoutHTML += `<div class="cart-item-container js-cart-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${fixedPrice(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItems.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-update-id = ${matchingProduct.id}>
                    Update
                  </span>
                  <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-link link-primary" data-save-id = ${matchingProduct.id}>save</span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-delete-id = ${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliveryHTML(matchingProduct,cartItems)}
              </div>
            </div>
          </div> `;
    })

    document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

    document.querySelector('.js-checkout-header').innerHTML = calculateCartQuantity();

    function deliveryHTML(matchingItem,cartItems) 
    {
      let html = '';
 
      deliveryOption.forEach((option) => 
      {

        const isChecked = option.id === cartItems.deliveryId; 

        const price = option.priceCents === 0 ? 'Free' : `$${fixedPrice(option.priceCents)} - `;  

        console.log(isChecked);

        html += `
                <div class="delivery-option js-delivery-option" data-delivery-id = ${option.id}
                data-product-id = ${matchingItem.id}>
                  <input type="radio" 
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input" 
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      ${price} Shipping
                    </div>
                  </div>
                </div>
              `
      });

      return html;
    }

    document.querySelectorAll('.js-update-quantity').forEach((updateButton) => {
        updateButton.addEventListener('click', () => {
            const updateId = updateButton.dataset.updateId;

            const inputId = document.querySelector(`.js-cart-${updateId}`);

            inputId.classList.add('edit-quantity');
        })
    })

    document.querySelectorAll('.save-link').forEach((saveLink) => {
        saveLink.addEventListener('click', () => {
            const saveId = saveLink.dataset.saveId;

            const save = document.querySelector(`.js-cart-${saveId}`);

            const input = document.querySelector(`.js-quantity-input-${saveId}`).value;

            const quantity = Number(input);

            editQuantity(saveId, quantity);

            console.log(quantity);

            save.classList.remove('edit-quantity');

            renderOrderSummary();
        })
    })

    document.querySelectorAll('.js-delete-button').forEach((deleteButton) =>
    {
      deleteButton.addEventListener('click', () => 
      {
        const deleteId = deleteButton.dataset.deleteId;

        deleteItem(deleteId);

        renderOrderSummary();
      })
    })

    document.querySelectorAll('.quantity-input').forEach((input) => 
    {
      input.addEventListener('keydown', (event) => 
      {
        if(event.key === 'Enter')
        {
          input.closest('.cart-item-container').querySelector('.save-link').click();
        }
      });
    })

    document.querySelectorAll('.js-delivery-option').forEach((deliveryElement) => 
    {
      deliveryElement.addEventListener('click', ()=>
      {
        const {productId, deliveryId} = deliveryElement.dataset;
        updateDeliveryOption(productId,deliveryId);
        renderOrderSummary();
      }) 
    })
}



