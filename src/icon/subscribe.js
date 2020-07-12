function subscribe (bus, state) {
    var api = {
        add: function (product) {
            state.set({
                products: state().products.concat([product])
            })
        },

        remove: function (index) {
            var products = state().products
            products.splice(index, 1)
            state.set({ products })
        }
    }

    bus.on('click', function (ev) {
        console.log('click')
        api.add(null)
    })

}

module.exports = subscribe

