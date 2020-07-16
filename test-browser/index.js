var test = require('tape')
import Cart from '../src/cart'

var cart = new Cart({ storage: false })

test('cart', function (t) {
    cart.createIcon()
    t.ok(cart, 'should create cart')
    t.end()
})

test('cart.add and cart.products', function (t) {
    var product = { name: 'foo' }
    cart.add(product)
    var ps = cart.products()
    t.equal(product, ps[0], 'should add and return the thing')
    t.end()
})

