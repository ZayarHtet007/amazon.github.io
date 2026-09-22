import {products} from "../data/products.js";
import {fixedPrice} from "../fixed/fixedPrice.js";

let generatehtml = '';

products.forEach((product) => 
{
    generatehtml += 
                    `
                    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.stars}
            </div>
          </div>

          <div class="product-price">
            $${fixedPrice(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-button-id = ${product.id}>
            Add to Cart
          </button>
        </div>
                    `
});

document.querySelector('.product-grid-js').innerHTML = generatehtml;

const addMessageId = {};

document.querySelectorAll('.add-to-cart-button').forEach((button) => 
{
  button.addEventListener('click', () =>
  {
    const buttonId = button.dataset.buttonId;

    const addMessage = document.querySelector(`.js-added-to-cart-${buttonId}`);

    addMessage.classList.add('visiual-message');

    setTimeout(()=>
    {
      const previousId = addMessage[buttonId];

      if(previousId)
      {
        clearTimeout(previousId);
      }
      const intervalId = setTimeout(()=>
      {
        addMessage.classList.remove('visiual-message')
      },2000);
      addMessage[buttonId] = intervalId;
    });
  })
})