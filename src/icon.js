import { render } from 'preact'
import { html } from 'htm/preact'
// var observ = require('observ')
var connect = require('./connect')
var struct = require('observ-struct')
var subscribe = require('./subscribe')

var state = struct({
    products: []
})
var { bus, view } = connect(state, Cart)
subscribe(bus, state)

function Cart (props) {
    var { emit } = props
    var { products } = state()

    return html`<div>
        clicks: ${products.length}
        <button onClick=${emit('click')}>click</button>
    </div>`
}

function renderIcon (el) {
    var _el = el || document.getElementById('shopping-cart-icon')
    render(html`<${view} />`, _el)
}

window.Icon = renderIcon
export default renderIcon

