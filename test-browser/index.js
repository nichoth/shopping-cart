var test = require('tape')
import Cart from '../src/cart'
import EVENTS from '../src/EVENTS'

var cart

test('cart', function (t) {
    cart = new Cart({ storage: false })
    cart.createIcon()
    t.ok(cart, 'should create cart')
    t.end()
})

test('cart.add and cart.products', function (t) {
    var product = { name: 'foo', quantity: 1 }
    cart.add(product)
    var ps = cart.products()
    t.equal(product.name, ps[0].name, 'should add and return the thing')
    t.end()
})

test('cart.changeQuantity', function (t) {
    t.plan(2)
    cart.on(EVENTS.quantity.change, function (ev) {
        t.ok(ev, 'should emit change event')
    })
    cart.changeQuantity(0, 3)
    t.equal(cart.products()[0].quantity, 3, 'should update the quantity')
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

