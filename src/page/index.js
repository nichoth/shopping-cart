import { html } from 'htm/preact'
import { render } from 'preact'
var connect = require('../connect')
import subscribe from './subscribe'

function createPage (state, el) {
    var { bus, view } = connect(state, CartPage)
    console.log('sub', subscribe)
    var api = subscribe(bus, state)

    function CartPage (props) {
        // var { emit } = props
        var { products } = state()

        return html`<div>
            the cart page
            ${' ' + products.length}
        </div>`
    }

    // render
    var _el = el || document.getElementById('shopping-cart-page')
    render(html`<${view} />`, _el)
    return api
}

window.createShoppingCartPage = createPage
export default createPage

