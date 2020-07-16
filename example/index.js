import Cart from '../src/cart'

var cart = new Cart({
    key: 'demo-cart',
    storage: true
})

// pass in an element to mount it at
// or it will automatically mount to the given ID
cart.createIcon(document.getElementById('shopping-cart-icon'), {
    link: 'example.com'
})
cart.createPage(document.getElementById('shopping-cart-page'), mapper)

function mapper (html, product) {
    console.log('in map', product)
    return html`
        <span>name: ${product.name || 'none'}, </span>
        <span>price: ${product.price || 'none'}<//>
    `
}

