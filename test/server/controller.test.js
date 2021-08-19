const assert = require('assert')
const path = require('path')
const { rm } = require('fs/promises')

const Controller = require('../../src/server/controller')

const controller = new Controller()

async function testController () {
  try {
    await rm(path.join(process.cwd(), 'db/data.json'))
  } catch (err) {}

  let registrations = await controller.getRegistrationList()

  assert.ok(registrations instanceof Array)
  assert.strictEqual(registrations.length, 0)

  console.log('(1) getRegistrationList test done.')

  await controller.addRegistration({
    foo: 'bar 1'
  })

  await controller.addRegistration({
    foo: 'bar 2'
  })

  console.log('(2) addRegistration test done.')

  registrations = await controller.getRegistrationList()

  assert.ok(registrations instanceof Array)
  assert.strictEqual(registrations.length, 2)
  assert.strictEqual(registrations[0].foo, 'bar 1')
  assert.strictEqual(registrations[1].foo, 'bar 2')

  console.log('(3) getRegistrationList test done.')
}

testController()
  .then(() => {
    console.log('All tests done.')
  })
  .catch(err => {
    console.log(err.stack)
  })
