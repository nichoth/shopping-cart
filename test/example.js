var test = require('tape')

test('example test', function (t) {
    t.plan(2)

    t.equal(typeof Date.now, 'function', 'should be a function')
    t.pass('example')
})

