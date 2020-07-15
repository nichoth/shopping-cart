import { render } from 'preact'
import { html } from 'htm/preact'
var connect = require('./connect')
var Bus = require('@nichoth/events')
var struct = require('observ-struct')
var xtend = require('xtend')
var KEY = 'cart'

class Cart extends Bus {
    constructor ({ storage } = { storage: true }) {
        super()

        var state = this.state = struct({
            products: []
        })

        this.on('click', ev => {
            state.set({
                products: state().products.concat([null])
            })
        })

        // TODO
        // * load things from localstorage
        if (storage) {
            this.storage = true
            var storageState = localStorage.getItem(KEY)
            if (storageState) state.set(storageState)
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

        this.on('click', ev => console.log('click'))

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
        // pass in `this` as bus
        var state = this.state
        var { view } = connect(state, CartPage, this)

        this.on('click', ev => console.log('click here'))

        function CartPage (props) {
            return html`<div>
                cart page
                ${state().products.map(product => {
                    return html`<li>product</li>`
                })}
            </div>`
        }

        var _el = el || document.getElementById('shopping-cart-icon')
        render(html`<${view} />`, _el)
    }
}

export default Cart

