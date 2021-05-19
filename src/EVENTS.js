var namespace = require('@nichoth/events/namespace')

var EVENTS = namespace({
    cart: ['add', 'remove'],
    quantity: ['change'],
    product: ['change']
})

export default EVENTS
