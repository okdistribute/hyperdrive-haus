var test = require('tape')
var Haus = require('./')
var concat = require('concat-stream')
var swarm = require('hyperdrive-archive-swarm')
var hyperdrive = require('hyperdrive')
var memdb = require('memdb')

test('list', function (t) {
  t.plan(2)
  var drive = hyperdrive(memdb())
  var archive = drive.createArchive()
  var sw = swarm(archive)
  archive.createFileWriteStream('hello.txt').end('BEEP BOOP\n')
  archive.finalize(function () {
    var haus = Haus(archive)
    haus.list(function (err, data) {
      t.ifError(err)
      t.same(data.length, 1, 'one file')
      t.end()
      sw.close()
    })
  })
})

test('list stream', function (t) {
  t.plan(1)
  var drive = hyperdrive(memdb())
  var archive = drive.createArchive()
  var sw = swarm(archive)
  archive.createFileWriteStream('hello.txt').end('BEEP BOOP\n')
  archive.finalize(function () {
    var haus = Haus(archive)
    var stream = haus.list()
    stream.on('data', function (data) {
      var file = JSON.parse(data.toString())
      t.same(file.name, 'hello.txt')
    })
    stream.on('error', function (err) {
      t.ifError(err)
    })
    stream.on('end', function () {
      t.end()
      sw.close()
    })
  })
})

test('write and read', function (t) {
  t.plan(1)
  var drive = hyperdrive(memdb())
  var archive = drive.createArchive()
  var sw = swarm(archive)
  var contents = 'BEEP BOOP\n'
  archive.createFileWriteStream('hello.txt').end(contents)
  archive.finalize(function () {
    var haus = Haus(archive)
    var stream = haus.createFileReadStream('hello.txt')
    stream.pipe(concat(function (data) {
      t.same(data.toString(), contents, 'contents are the same')
    }))
    stream.on('end', function () {
      t.end()
      sw.close()
    })
  })
})
