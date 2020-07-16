import Cart from '../src/cart'

var cart = new Cart()

// pass in an element to mount it at
// or it will automatically mount to the given ID
cart.createIcon(document.getElementById('shopping-cart-icon'))
cart.createPage(document.getElementById('shopping-cart-page'), mapper)

function mapper (html, product) {
    console.log('here', product)
    return html`<li>
        <span>${product.name}</span>
        <span>${' ' + product.price}<//>
    </li>`
}

