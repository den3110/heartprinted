const emptyCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cartItems')) {
            localStorage.removeItem('cartItems')
            localStorage.removeItem('cartItems')
            window.location.replace("/order/success");
        }
    }
    return [];
};

export default {
    emptyCart
};