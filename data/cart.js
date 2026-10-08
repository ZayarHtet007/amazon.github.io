import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 0,
        deliveryId : '1',
        orderTime : '0'
    }
]

export function saveToStorage()
{
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function getProduct(productId) 
{
    let matchingItems;

    products.forEach((productItems) => 
    {
        if(productItems.id == productId)
        {
         matchingItems = productItems;
        }
    })

    return matchingItems;
}

export function addToCart(productId)
{
    let matchingItem;

    cart.forEach((cartItems) => 
    {
        if(productId == cartItems.productId)
        {
            matchingItem = cartItems;
        }
    })

    const id = document.querySelector(`.js-quantity-selector-${productId}`);

    const quantity = Number(id.value);

    if(matchingItem)
    {
        matchingItem.quantity += quantity;
    }
    else 
    {
        cart.push(
            {
                productId : productId,
                quantity : quantity,
                deliveryId : '1',
                orderTime : '0'
            }
        )
    }

    saveToStorage();
}

export function editQuantity(productId, quantity)
{
    let matchingItem;
    cart.forEach((cartItems) => 
    {
        if(cartItems.productId == productId)
        {
            matchingItem = cartItems;
        }
    })

   if(quantity>0 && quantity<=10000)
   {
    matchingItem.quantity = quantity;
   }
   else
   {
    alert("Invalid quantity!!");
   }

    saveToStorage();
}

export function calculateCartQuantity()
{
    let cartQuantity = 0;
    cart.forEach((cartItems) => 
    {
        cartQuantity += cartItems.quantity;
    })

    return cartQuantity;
}

export function deleteItem(deleteId)
{
    const newCart = [];

    cart.forEach((cartItems) => 
    {
        if(cartItems.productId != deleteId)
        {
            newCart.push(cartItems);
        }
    })

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryId)
{
    let matchingItem;

    cart.forEach((items) => 
    {
        if(productId == items.productId)
        {
            matchingItem = items;
        }
    })

    matchingItem.deliveryId = deliveryId;
    saveToStorage();
}