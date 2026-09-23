let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 0,
        deliveryId : '1'
    }
]

export function saveToStorage()
{
    localStorage.setItem('cart', JSON.stringify(cart));
};

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
                deliveryId : '1'
            }
        )
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

    saveToStorage();

    return cartQuantity;
}