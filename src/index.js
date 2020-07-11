import { h, render, Component } from 'preact'
import htm from 'htm'
// import { useState } from 'preact/hooks'
var html = htm.bind(h)
var Bus = require('@nichoth/events')
// var observ = require('observ')
var struct = require('observ-struct')

var state = struct({
    count: 0
})

var bus = Bus({
    memo: true
})

function emit () {
    return bus.emit.apply(bus, arguments)
}

function subscribe (bus, state) {
    bus.on('plus', function () {
        console.log('plus')
        state.set({
            count: state().count + 1
        })
    })
}

subscribe(bus, state)

class Example extends Component {
    constructor(props) {
        super(props)
        this.state = state()
    }

    componentDidMount () {
        setInterval(function () {
            emit('plus', null)
        }, 1000)

        var self = this
        state(function onChange (data) {
            self.setState(data)
        })
    }

    render () {
        return html`<div>Count: ${this.state.count} <//>`
    }
}

render(html`<${Example} />`, document.getElementById('content'))

