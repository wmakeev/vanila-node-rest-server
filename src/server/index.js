const http = require('http')
const Controller = require('./controller')
const { getReqData } = require('./utils')

const PORT = process.env.PORT || '8080'

const server = http.createServer(async (req, res) => {
  let responseCode = 200
  const responseContentType = 'application/json'
  let responseData

  try {
    const controller = new Controller()

    switch (true) {
      case req.method === 'GET' && req.url === '/api/registration': {
        const registrationList = await controller.getRegistrationList()

        responseData = JSON.stringify(registrationList, null, 2)

        break
      }

      case req.method === 'POST' && req.url === '/api/registration': {
        const data = await getReqData(req)

        const registration = await controller.addRegistration(JSON.parse(data))

        responseData = JSON.stringify(registration, null, 2)

        break
      }

      default: {
        responseCode = 404
        responseData = JSON.stringify({ message: `Route not found - ${req.url}` })
      }
    }
  } catch (err) {
    responseCode = 500
    responseData = JSON.stringify({ error: err.message })
  }

  res.writeHead(responseCode, { 'Content-Type': responseContentType })
  res.end(responseData)
})

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
})
