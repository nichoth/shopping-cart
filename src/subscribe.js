function subscribe (bus, state) {
    bus.on('click', function (ev) {
        console.log('click')
        state.set({
            products: state().products.concat([null])
        })
    })

}

module.exports = subscribe

