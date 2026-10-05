export const deliveryOption = [
    {
        id : '1',
        day : 7,
        priceCents : 0
    },

    {
        id : '2',
        day : 3,
        priceCents : 499 
    },

    {
        id : '3',
        day: 1,
        priceCents : 999
    }
];

export function getDeliveryItems(deliveryId)
{
    let matchingOption;

    deliveryOption.forEach((deliveryItems) => 
    {
        if(deliveryId === deliveryItems.id)
        {
            matchingOption = deliveryItems;
        }
    })

    return matchingOption;
}