var test = require('tape')
import Cart from '../src/cart'

var cart = new Cart({ storage: false })

test('cart', function (t) {
    cart.createIcon()
    t.ok(cart, 'should create cart')
    t.end()
})

test('cart.add', function (t) {
    t.end()
})

