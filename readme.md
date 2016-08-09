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

## API

### `var archive = haus(archive, opts)`

`archive`: a hyperdrive archive **or** a hex encoded hyperdrive string.
`opts`:
  - `url`: the URL for dat.haus, defaults to `http://dat.haus`

### `archive.createFileReadStream(entry)`

Creates a read stream of the file with a given file name

Example:

```js
var readStream = archive.createFileReadStream('hello.txt')
readStream.pipe(process.stdout)
```

### `archive.list(callback)`

List the files in the archive. Takes an optional callback. Will return a stream if callback not supplied.

```js
var stream = archive.list()
stream.on('data', function (entry) {
  console.log(entry)
})
```
