export const getOrderData = (cart, total) => {
    let order = {};
    order["cart"] = cart;
    order["total"] = total;
    order["created_date"] = new Date();
    return order;
}
export const filterItems = (items, cart) => {
    let cartIds = cart.map(item => item.id);
    let filtered = [];
    filtered = items.filter(item => {
        if (!cartIds.includes(item.id)) {
            return item;
        }
    });
    return filtered;
}