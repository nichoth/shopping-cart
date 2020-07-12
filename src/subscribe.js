function subscribe (bus, state) {
    bus.on('click', function (ev) {
        console.log('click')
        state.set({
            hello: state().hello + 1
        })
    })

}

module.exports = subscribe

