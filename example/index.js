import Cart from '../src/cart'

var cart = new Cart({
    key: 'demo-cart',
    storage: true
})

window.cart = cart

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

// ---------------- button to add a thing ----------------

var el = document.createElement('div')
var btn = document.createElement('button')
btn.appendChild(document.createTextNode('add a thing'))
el.appendChild(btn)

var n = 0
btn.addEventListener('click', function (ev) {
    cart.add({ name: 'abc ' + n, price: 10 })
    n++
})

document.body.appendChild(el)

// ------------------------------------------------------------
var emptyBtn = document.createElement('button')
emptyBtn.appendChild(document.createTextNode('empty'))
document.body.appendChild(emptyBtn)
emptyBtn.addEventListener('click', function (ev) {
    ev.preventDefault()
    cart.empty()
})




