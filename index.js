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
const PORT = process.env.PORT || 4000;

// Whitelist the specific Amplify frontend domain for security
// You can add more domains to this array if needed
// const allowedOrigins = [
//   'https://main.d28cuyvuvwde3v.amplifyapp.com'
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests without origin (like preflight, curl, Postman)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.error("CORS blocked origin:", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
// };

// Use the CORS middleware before the JSON-Server router
mediaPlayerServer.use(cors({
  origin: 'https://main.d28cuyvuvwde3v.amplifyapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Use the default JSON-Server middlewares
mediaPlayerServer.use(middlewares);

// Use the router
mediaPlayerServer.use(router);

// Listen on the specified port
mediaPlayerServer.listen(PORT, () => {
  console.log(`JSON-Server is running on port ${PORT}`);
});
