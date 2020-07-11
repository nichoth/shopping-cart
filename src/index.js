import { h, render } from 'preact'
import htm from 'htm'
import { useState } from 'preact/hooks'
var html = htm.bind(h)

function Example (props) {
    var [count, setCount] = useState(0)

    setInterval(function () {
        setCount(count + 1)
    }, 1000)

    return html`<div>
        Count: ${count}
    </div>`
}

render(html`<${Example} />`, document.getElementById('content'))

