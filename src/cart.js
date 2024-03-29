import { render } from 'preact'
import { html } from 'htm/preact'
import Icon from './icon'
import IconX from './icon-x'
var connect = require('./connect')
var Bus = require('@nichoth/events')
var struct = require('observ-struct')
var xtend = require('xtend')
import EVENTS from './EVENTS'

class Cart extends Bus {
    constructor (_opts) {
        _opts = _opts || {}
        var opts = {
            storage: _opts.storage === undefined ? true : _opts.storage,
            key: _opts.key || 'cart'
        }
        super()

        var state = this.state = struct({
            products: []
        })
        this.KEY = opts.key

        if (opts.storage) {
            this.storage = true
            var storageState = localStorage.getItem(this.KEY)
            if (storageState) state.set({
                products: JSON.parse(storageState).products
            })
        }
    }

    static createProduct (obj) {
        // need these two properties on `products`
        return xtend({
            quantity: 1,
            quantityAvailable: 1
        }, obj)
    }

    add (_product) {
        var state = this.state
        var product = xtend(_product, {
            quantity: _product.quantity || 1
        })

        var i = state().products.length

        state.set(xtend(state(), {
            products: state().products.concat([product])
        }))

        if (this.storage) {
            window.localStorage.setItem(this.KEY, JSON.stringify({
                products: state().products
            }))
        }

        return i
    }

    update (i, updatedProduct) {
        var state = this.state
        var updated = xtend(this.products()[i], updatedProduct)
        var products = state().products
        products.splice(i, 1, updated)
        state.set({
            products: products
        })

        if (this.storage) {
            window.localStorage.setItem(this.KEY, JSON.stringify({
                products: state().products
            }))
        }

        this.emit(EVENTS.product.change, {
            index: i,
            product: updated
        })

        return this
    }

    changeQuantity (i, quantity) {
        var state = this.state
        var prods = state().products
        prods[i].quantity = quantity
        state.set({
            products: prods
        })
        if (this.storage) {
            window.localStorage.setItem(this.KEY, JSON.stringify({
                products: state().products,
            }))
        }
        this.emit(EVENTS.quantity.change, { index: i, quantity: quantity })
        return this
    }

    products () {
        return this.state().products
    }

    remove (index) {
        var state = this.state
        var products = state().products
        products.splice(index, 1)
        state.set(xtend(state(), { products }))
        if (this.storage) {
            window.localStorage.setItem(this.KEY, JSON.stringify({
                products: state().products
            }))
        }
    }

    empty () {
        this.state.set(xtend(this.state(), {
            products: []
        }))
        if (this.storage) {
            var data = JSON.stringify({
                products: this.state().products
            })
            window.localStorage.setItem(this.KEY, data)
        }
    }

    ohno (i) {
        // return if there is not enough of something available
        if (i === undefined) {
            var { products } = this.state()
            var ohno = products.reduce((wonk, item) => {
                return (wonk || item.quantity > item.quantityAvailable)
            }, false)
            return ohno
        }
        var prod = this.state().products[i]
        return prod.quantity > prod.quantityAvailable
    }

    createIcon (el, icon, opts) {
        // pass in `this` as bus
        opts = opts || {}
        var state = this.state
        var { view } = connect(state, CartIcon, this)
        var { link } = opts

        var LilIcon = icon || Icon

        function CartIcon (props) {
            var { products } = state()

            var ohno = products.reduce((wonk, item) => {
                return (wonk || item.quantity > item.quantityAvailable)
            }, false)

            var quant = products.reduce((total, prod) => {
                return total + (prod.quantity || 1)
            }, 0)

            var content = ohno ? '!' : quant

            return html`<a href=${link} id="cart-icon"
                class=${ohno ? 'ohno' : ''}
            >
                <div>
                    <span id="cart-quantity" class="${ohno ? 'ohno' : ''}">
                        ${content}
                    <//>
                    <${LilIcon} />
                </div>
            </a>`
        }

        var _el = this.iconEL = (el ||
            document.getElementById('shopping-cart-icon'))

        render(html`<${view} />`, _el)
    }

    createPage (el, mapper) {
        var state = this.state
        // pass in `this` as bus
        var { view } = connect(state, CartPage, this)
        var self = this

        function onRemove (ev, i) {
            ev.preventDefault()
            self.remove.call(self, i)
            self.emit(EVENTS.cart.remove, i)
        }

        function CartPage (props) {
            return html`<ul id="cart-page">
                ${state().products.map((product, i) => {
                    return html`<li>
                        ${mapper(html, product, i)}
                        <button onClick=${ev => onRemove(ev, i)}>
                            <${IconX} />
                        </button>
                    </li>`
                })}
            </ul>`
        }

        var _el = el || document.getElementById('shopping-cart-page')
        render(html`<${view} />`, _el)
    }
}

export default Cart

