var namespace = require('@nichoth/events/namespace')


var EVENTS = namespace({
    cart: ['add', 'remove'],
    quantity: ['change']
})

export default EVENTS
