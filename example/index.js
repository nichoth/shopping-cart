// import createPage from '../src/page'
// import createIcon from '../src/icon'
// import State from '../src/state'
import Cart from '../src/cart'

// pass in an element to mount it at
// or it will automatically mount to the given ID
// can also call window.Icon()


var cart = new Cart({
    products: []
})
cart.createIcon(document.getElementById('shopping-cart-icon'))
cart.createPage(document.getElementById('shopping-cart-page'))


// var state = State()
// createIcon(state, document.getElementById('shopping-cart-icon'))
// createPage(state, document.getElementById('shopping-cart-page'))

