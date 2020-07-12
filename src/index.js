import { render } from 'preact'
var connect = require('./connect')
import { html } from 'htm/preact'
// var observ = require('observ')
var struct = require('observ-struct')
var subscribe = require('./subscribe')

var state = struct({
    hello: 0
})
var { bus, view } = connect(state, Example)
subscribe(bus, state)

function Example (props) {
    var { emit } = props

    return html`<div>
        hello ${state().hello}
        <button onClick=${emit('click')}>click</button>
    </div>`
}

render(html`<${view} />`, document.getElementById('content'))

