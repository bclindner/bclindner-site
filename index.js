var cluster = require('cluster')
var models = require('./models')
var workerCount = process.env.WEB_CONCURRENCY || require('os').cpus().length
// cluster setup: use server.js as our worker)
cluster.setupMaster({
  exec: 'server.js'
})
cluster.on('online', (worker) => {
  console.log('worker id ' + worker.id + ' online.')
})
cluster.on('exit', (worker, code, signal) => {
  console.log('worker id ' + worker.id + ' exited with code ' + code + '.')
  // restart it
  cluster.fork()
})
// sync server and fork based on CPU count (or environment var)
process.stdout.write('syncing database...')
models.sequelize.sync().then(() => {
  process.stdout.write('done.\nstarting workers...\n')
  for (var i = 0; i < workerCount; i++) {
    cluster.fork()
  }
})
