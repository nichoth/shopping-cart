import { render } from 'preact'
import { html } from 'htm/preact'
var connect = require('./connect')
var Bus = require('@nichoth/events')
var struct = require('observ-struct')

class Cart extends Bus {
    constructor () {
        super()
        this.state = struct({
            products: []
        })
    }

    createIcon (el) {
        // pass in `this` as bus
        var state = this.state
        var { view } = connect(state, CartIcon, this)

        this.on('click', ev => console.log('click'))

        this.on('click', ev => {
            state.set({
                products: state().products.concat([null])
            })
        })

        function CartIcon (props) {
            var { emit } = props
            var { products } = state()

            return html`<div>
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

