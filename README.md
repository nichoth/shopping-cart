# shopping cart

A shopping cart UI widget

Uses preact

## install

```
npm i -S @nichoth/shopping-cart
```

A browserified bundle is in `/dist`. Or you would import `src/cart` if you are bundling these prior to use.

## example

### With `import`
```js
import Cart from '@nichoth/shopping-cart'
import EVENTS from '@nichoth/cart/EVENTS'

// args are optional
var cart = new Cart({
    storage: true // store the state in localStorage?
    key: 'cart'  // default is 'cart'
})
// pass in an element to mount it at
// or it will automatically mount to the given ID
cart.createIcon(document.getElementById('shopping-cart-icon'))
cart.createPage(document.getElementById('shopping-cart-page'), mapper)

function mapper (html, product) {  // `html` here is from 'htm' on npm
    console.log('in map', product)
    return html`
        <span>name: ${product.name || 'none'}, </span>
        <span>price: ${product.price || 'none'}<//>
    `
}

// `cart` is an event eitter
cart.on(EVENTS.quantity.change, ev => {
    console.log('quantity', ev.quantity)
    console.log('index', ev.index)
})

cart.on(EVENTS.cart.remove, index => {
    console.log('index of the removed item', index)
})

var products = cart.products()

cart.remove(1) // remove the product at index 1
cart.empty()  // remove everything in the cart
```

### Without importing
```html
<script src="/path/to/cart/dist/bundle.js"></script>
<script>
    var cart = new window.Cart({})
    cart.createIcon(document.getElementById('shopping-cart-icon'))
    cart.createPage(document.getElementById('shopping-cart-page'))
</script>
```


## develop

Start a local dev server
```
npm start
```

-------------------------------------------

[Creating A Shopping Cart With HTML5 Web Storage](https://www.smashingmagazine.com/2019/08/shopping-cart-html5-web-storage/)

[Ecommerce cart design best practices](https://webflow.com/blog/ecommerce-cart-design)

