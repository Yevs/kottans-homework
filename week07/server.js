const config = require('config')

const App = require('./App')

port = config.get('port')

app = new App()

app.use((req, res) => console.log('HELLO'))
app.use((req, res) => {
  console.log('WORLD')
  res.end('hello')
})

app.start(port, () => console.log(`started server on ${port}`))
