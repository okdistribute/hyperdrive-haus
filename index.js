const hyperquest = require('hyperquest')
const ndjson = require('ndjson')
const pump = require('pump')
const concat = require('concat-stream')

module.exports = Haus

function Haus (key, opts) {
  if (!(this instanceof Haus)) return new Haus(key, opts)
  if (!opts) opts = {}
  this.key = key.key ? key.key.toString('hex') : key
  this.url = opts.url || 'http://dat.haus'
}

Haus.prototype.list = function (opts, cb) {
  var stream = hyperquest.get(this.url + '/' + this.key)
  if (!cb) return stream
  pump(stream, ndjson.parse(), concat(function (data) {
    cb(null, data)
  }), function (err) {
    if (err) return cb(err)
  })
}

Haus.prototype.createFileReadStream = function (entry) {
  var name = entry.name || entry
  var path = this.url + '/' + this.key + '/' + name
  var stream = hyperquest.get(path)
  return stream
}
