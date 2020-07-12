function subscribe (bus, state) {
    bus.on('click', function (ev) {
        clicky('clicky')
    })

    function clicky (words) {
        console.log('clicky', words, state())
    }

    return { clicky }
}

export default subscribe

