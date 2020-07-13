import Cart from '../src/cart'

// takes an argument that is state
var cart = new Cart({
    products: []
})
// pass in an element to mount it at
// or it will automatically mount to the given ID
cart.createIcon(document.getElementById('shopping-cart-icon'))
cart.createPage(document.getElementById('shopping-cart-page'))

