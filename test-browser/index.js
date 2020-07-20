var test = require('tape')
import Cart from '../src/cart'

var cart

test('cart', function (t) {
    cart = new Cart({ storage: false })
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

test('cart.remove', function (t) {
    cart.remove(0)
    t.equal(cart.products()[0], undefined, 'should remove a thing')
    t.end()
})

test('cart.empty', function (t) {
    cart.add({ name: 'ok' })
    t.equal(cart.products().length, 1, 'should have 1 thing')
    cart.empty()
    t.equal(cart.products().length, 0, 'should remove all the things')
    t.end()
})

