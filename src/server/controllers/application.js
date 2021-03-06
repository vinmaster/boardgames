const Logger = require(process.cwd() + '/src/server/lib/logger')
const Util = require(process.cwd() + '/src/server/lib/util')
const Db = require(process.cwd() + '/src/server/lib/db')

module.exports = class Application {
  static index(req, res, next) {
    const bundlePath = process.env.NODE_ENV === 'production' ? res.locals.webpack_asset('main').js : '/js/bundle.js'
    res.render('index', { title: 'Boardgames', scripts: [bundlePath] })
  }

  static config(req, res, next) {
    Util.renderJson(res, { config: 'test' })
  }

  static db(req, res, next) {
    Util.renderJson(res, {
      hot: Db.hot,
      boardgames: Db.boardgames,
      search: Db.search,
    })
  }

  static error(req, res, next) {
    Logger.error('THIS IS TEST ERROR')
    next(new Error('This is an error and it should be logged to the console'))
    // Util.renderBadJson(res, 'test')
  }

  static test(req, res, next) {
    Logger.info('THIS IS TEST INFO')
    res.send('test')
  }
}
