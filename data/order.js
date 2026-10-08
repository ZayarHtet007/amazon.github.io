import {cart} from "./cart.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order)
{
    orders.push(order);

    saveToStorage();
}

function saveToStorage()
{
    localStorage.setItem('orders' , JSON.stringify(orders));
}

export function calculateOrderQuantity()
{
    let total = 0;

    orders.forEach((order) => 
    {
        total += order.quantity;
    })

    return total;
}

export function getOrder(orderId) 
{
    let matchingOrder;

    orders.forEach((cartItems) => 
    {
        if(cartItems.productId == orderId)
        {
            matchingOrder= cartItems;
        }
    })

    return matchingOrder;
}