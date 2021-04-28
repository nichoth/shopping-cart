import { h, Component } from 'preact'
var Bus = require('@nichoth/events')
var xtend = require('xtend')

function connect (state, View, bus) {
    var _bus = bus || Bus({
        memo: true
    })

    function emit () {
        return _bus.emit.apply(_bus, arguments)
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

    return { _bus, view: Connector }
}

module.exports = connect
