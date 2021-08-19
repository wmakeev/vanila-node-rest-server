const path = require('path')
const { readFile, writeFile } = require('fs/promises')

class Controller {
  constructor () {
    this.dbFile = path.join(process.cwd(), 'db/data.json')
  }

  async _readDbFile () {
    let data

    try {
      data = await readFile(this.dbFile, 'utf-8')
    } catch (err) {
      // db file not exist
      if (err.code === 'ENOENT') {
        return [] // empty list
      }
    }

    try {
      return JSON.parse(data)
    } catch (err) {
      throw new Error('Data file is broken!')
    }
  }

  async _writeDbFile (data) {
    await writeFile(this.dbFile, JSON.stringify(data, null, 2))
  }

  async getRegistrationList () {
    return this._readDbFile()
  }

  async addRegistration (registration) {
    const registrationList = await this._readDbFile()

    await this._writeDbFile([
      ...registrationList,
      registration
    ])

    return registration
  }
}

module.exports = Controller
