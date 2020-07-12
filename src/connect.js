import { h, Component } from 'preact'
// import htm from 'htm'
// var html = htm.bind(h)
var Bus = require('@nichoth/events')
// var observ = require('observ')
// var struct = require('observ-struct')
// import { html } from 'htm/preact'
var xtend = require('xtend')

function connect (state, View) {
    var bus = Bus({
        memo: true
    })

    function emit () {
        return bus.emit.apply(bus, arguments)
    }

    class Connector extends Component {
        constructor(props) {
            super(props)
            this.state = state()
        }

        componentDidMount () {
            var self = this
            state(function onChange (data) {
                self.setState(data)
            })
        }

        render (props) {
            return h(View, xtend(props, { emit }), props.children)
        }
    }

    return { bus, view: Connector }
}

module.exports = connect

