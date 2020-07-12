import createPage from '../src/page'
import createIcon from '../src/icon'

var { state } = createIcon(document.getElementById('shopping-cart-icon'))

// pass in an element to mount it at
// or it will automatically mount to the given ID

createPage(state, document.getElementById('shopping-cart-page'))

// can also call window.Icon()

