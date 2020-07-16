var test = require('tape')
import Cart from '../src/cart'

var cart = new Cart({ storage: false })

test('example', function (t) {
    t.ok(cart, 'should create cart')
    cart.createIcon()
    t.end()
})

