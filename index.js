// import json server
const jsonserver = require('json-server')

//create server
const mediaPlayerServer = jsonserver.create()

// create middleware to convert the json format
const middleware = jsonserver.defaults()

// set port for the server
const PORT = 4000 || process.env.PORT

// import db.json file
const router = jsonserver.router("db.json")

// server use middleware
mediaPlayerServer.use(middleware) // order: 1
mediaPlayerServer.use(router) // 2


// listen
mediaPlayerServer.listen(PORT,()=>{
    console.log(`server running successfully at port number ${PORT}`)
});

