var struct = require('observ-struct')

function createState () {
    return struct({
        products: []
    })
}

export default createState

