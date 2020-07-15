import { render } from 'preact'
import { html } from 'htm/preact'
var connect = require('./connect')
var Bus = require('@nichoth/events')
var struct = require('observ-struct')
var xtend = require('xtend')
import _key from './KEY'
var KEY = 'cart-' + _key
console.log('key', KEY)

class Cart extends Bus {
    constructor ({ storage } = { storage: true }) {
        super()

        var state = this.state = struct({
            products: []
        })

        var self = this
        this.on('click', ev => {
            console.log('click', ev)
            self.add('prod')
        })

        if (storage) {
            this.storage = true
            var storageState = localStorage.getItem(KEY)
            if (storageState) state.set(JSON.parse(storageState))
        }
    }

    add (product) {
        // TODO
        // * add to localStorage

        var state = this.state
        state.set(xtend(state(), {
            products: state().products.concat([product])
        }))

        if (this.storage) {
            window.localStorage.setItem(KEY, JSON.stringify(state()))
        }
    }

    get () {
        return this.state().products
    }

    remove () {
        // TODO
        // * rm from localStorage
    }

    buyThings () {
        // call a server endpoint with a list of product IDs
        // return a promise for the request
    }

    createIcon (el) {
        // pass in `this` as bus
        var state = this.state
        var { view } = connect(state, CartIcon, this)

        function CartIcon (props) {
            var { emit } = props
            var { products } = state()

            return html`<div id="cart-icon">
                clicks: ${products.length + ' '}
                <button onClick=${emit('click')}>click</button>
            </div>`
        }

        var _el = el || document.getElementById('shopping-cart-icon')
        render(html`<${view} />`, _el)
    }

    createPage (el) {
        var state = this.state
        // pass in `this` as bus
        var { view } = connect(state, CartPage, this)

        function CartPage (props) {
            return html`<div>
                cart page
                ${state().products.map(product => {
                    return html`<li>product</li>`
                })}
            </div>`
        }

        var _el = el || document.getElementById('shopping-cart-page')
        render(html`<${view} />`, _el)
    }
}

export default Cart

