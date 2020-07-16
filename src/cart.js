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

        // var self = this
        // this.on('click', ev => {
        //     console.log('click', ev)
        //     self.add({
        //         name: 'prod',
        //         price: 10
        //     })
        // })

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
        var state = this.state
        var products = state().products
        products.splice(index, 1)
        state.set({ products })
        if (this.storage) {
            window.localStorage.setItem(this.KEY, JSON.stringify(state()))
        }
    }

    buyThings () {
        // call a server endpoint with a list of product IDs
        // return a promise for the request
    }

    createIcon (el, opts) {
        // pass in `this` as bus
        var state = this.state
        var { view } = connect(state, CartIcon, this)
        var { link } = opts

        function CartIcon (props) {
            // var { emit } = props
            var { products } = state()

            return html`<a href=${link}>
                <div id="cart-icon">
                    <span id="cart-quantity">${products.length} <//>
                    <${Icon} />
                </div>
            </a>`
        }
        // <button onClick=${emit('click')}>click</button>

        var _el = el || document.getElementById('shopping-cart-icon')
        render(html`<${view} />`, _el)
    }

    createPage (el, mapper) {
        var state = this.state
        // pass in `this` as bus
        var { view } = connect(state, CartPage, this)
        var self = this

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
                ev.preventDefault()
                self.remove(i)
            }
        }

        var _el = el || document.getElementById('shopping-cart-page')
        render(html`<${view} />`, _el)
    }
}

export default Cart

