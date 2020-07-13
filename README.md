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
import Cart from '../src/cart'

var cart = new Cart()
// pass in an element to mount it at
// or it will automatically mount to the given ID
cart.createIcon(document.getElementById('shopping-cart-icon'))
cart.createPage(document.getElementById('shopping-cart-page'))
```

### Without importing
```html
<script src="/path/to/cart/dist/bundle.js"></script>
<script>
    var cart = new window.Cart({})
</script>
```


