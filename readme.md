# hyperdrive-haus

A hyperdrive javascript API for dat.haus

[![NPM](https://nodei.co/npm/hyperdrive-haus.png)](https://nodei.co/npm/hyperdrive-haus/)

```js
var haus = require('hyperdrive-haus')
var archive = haus('archive-key-here')

archive.list(function (err, files) {
  console.log(files) // list of files
})

```

### var archive = haus(archive, opts)

`archive`: a hyperdrive archive **or** a hex encoded hyperdrive string.
`opts`:
  - `url`: the URL for dat.haus, defaults to `http://dat.haus`
