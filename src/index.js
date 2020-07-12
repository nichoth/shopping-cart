import { render } from 'preact'
var connect = require('./connect')
import { html } from 'htm/preact'
// var observ = require('observ')
var struct = require('observ-struct')

var state = struct({
    hello: 0
})

var { bus, view } = connect(state, Example)

bus.on('click', function (ev) {
    console.log('click')
    state.set({
        hello: state().hello + 1
    })
})

function Example (props) {
    var { emit } = props

    return html`<div>
        hello ${state().hello}
        <button onClick=${emit('click')}>click</button>
    </div>`
}

render(html`<${view} />`, document.getElementById('content'))

