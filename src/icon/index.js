import { render } from 'preact'
import { html } from 'htm/preact'
var connect = require('../connect')
var subscribe = require('./subscribe')

function createCartIcon (state, el) {
    var { bus, view } = connect(state, Cart)
    var api = subscribe(bus, state)

    function Cart (props) {
        var { emit } = props
        var { products } = state()

        return html`<div>
            clicks: ${products.length}
            <button onClick=${emit('click')}>click</button>
        </div>`
    }

    var _el = el || document.getElementById('shopping-cart-icon')
    render(html`<${view} />`, _el)

    return { api }
}

window.Icon = createCartIcon
export default createCartIcon

