import { render } from 'preact'
import { html } from 'htm/preact'
import Icon from './icon'
import IconX from './icon-x'
var connect = require('./connect')
var Bus = require('@nichoth/events')
var struct = require('observ-struct')
var xtend = require('xtend')

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

        var self = this
        this.on('click', ev => {
            console.log('click', ev)
            self.add({
                name: 'prod',
                price: 10
            })
        })

        if (opts.storage) {
            this.storage = true
            var storageState = localStorage.getItem(this.KEY)
            if (storageState) state.set(JSON.parse(storageState))
        }
    }

    add (product) {
        var state = this.state
        state.set(xtend(state(), {
            products: state().products.concat([product])
        }))

        if (this.storage) {
            window.localStorage.setItem(this.KEY, JSON.stringify(state()))
        }
    }

    products () {
        return this.state().products
    }

    remove (index) {
        // TODO
        // * rm from state
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
                <span id="cart-quantity">${products.length} <//>
                <${Icon} />
                <button onClick=${emit('click')}>click</button>
            </div>`
        }

        var _el = el || document.getElementById('shopping-cart-icon')
        render(html`<${view} />`, _el)
    }

    createPage (el, mapper) {
        var state = this.state
        // pass in `this` as bus
        var { view } = connect(state, CartPage, this)

        function CartPage (props) {
            return html`<ul id="cart-page">
                ${state().products.map((product, i) => {
                    return html`<li>
                        ${mapper(html, product, i)}
                        <button onClick=${ev => remove(ev, i)}>
                            <${IconX} />
                        </button>
                    </li>`
                })}
            </ul>`

            function remove (ev, i) {
                console.log('remove product', i)
                ev.preventDefault()
            }
        }

        var _el = el || document.getElementById('shopping-cart-page')
        render(html`<${view} />`, _el)
    }
}

export default Cart

