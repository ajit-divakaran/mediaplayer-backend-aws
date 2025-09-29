// index.js

// Import json-server and cors
const jsonServer = require('json-server');
const cors = require('cors');

// Create the server
const mediaPlayerServer = jsonServer.create();

// Set up the router to your db.json file
const router = jsonServer.router('db.json');

// Get default middlewares from json-server, but with noCORS disabled.
// We'll handle CORS ourselves with the 'cors' package.
const middlewares = jsonServer.defaults();

// Set a specific port for the server
const PORT = 4000 || process.env.PORT;

// Whitelist the specific Amplify frontend domain for security
// You can add more domains to this array if needed
const allowedOrigins = [
  'https://main.d28cuyvuvwde3v.amplifyapp.com'
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Use the CORS middleware before the JSON-Server router
mediaPlayerServer.use(cors(corsOptions));

// Use the default JSON-Server middlewares
mediaPlayerServer.use(middlewares);

// Use the router
mediaPlayerServer.use(router);

// Listen on the specified port
mediaPlayerServer.listen(PORT, () => {
  console.log(`JSON-Server is running on port ${PORT}`);
});
