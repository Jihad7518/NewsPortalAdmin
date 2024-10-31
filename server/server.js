const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const db_connect = require('./utils/db');
const advertisementRoutes = require('./routes/advertisement');
const authRoutes = require('./routes/authRoutes');
const newsRoute = require('./routes/newsRoute');

const app = express();
app.use(bodyParser.json());

const allowedOrigins = [
    "https://news-portal-admin.vercel.app",
    "https://news-portal-admin-hjo9.vercel.app"
];

if (process.env.mode === 'production') {
    app.use(cors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200
    }));
} else {
    app.use(cors({
        origin: ["http://localhost:5173"],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200
    }));
}

// Logging middleware
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/advertisement', advertisementRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoute);

// Database connection
db_connect();

// Root route
app.get('/', (req, res) => res.send('Hello World!'));

// Catch-all route for undefined paths
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));





// const express = require('express');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db_connect = require('./utils/db');
// const advertisementRoutes = require('./routes/advertisement');
// const authRoutes = require('./routes/authRoutes');
// const newsRoute = require('./routes/newsRoute');

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());

// // CORS configuration
// const allowedOrigins = [
//     "https://news-portal-admin.vercel.app",
//     "https://news-portal-admin-hjo9.vercel.app"
// ];

// if (process.env.mode === 'production') {
//     app.use(cors({
//         origin: allowedOrigins,
//         credentials: true // Allow credentials (cookies, authorization headers, etc.)
//     }));
// } else {
//     app.use(cors({
//         origin: ["http://localhost:5173"]
//     }));
// }

// // Logging middleware (for debugging)
// app.use((req, res, next) => {
//     console.log(`Received request: ${req.method} ${req.url}`);
//     next();
// });

// // Routes
// app.use('/api/advertisement', advertisementRoutes);
// app.use('/api/auth', authRoutes); // Explicitly define the API prefix
// app.use('/api/news', newsRoute); // Explicitly define the API prefix
// app.get('/', (req, res) => res.send('Hello World!'));

// // Database connection
// db_connect();

// // Start server
// const port = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not defined
// app.listen(port, () => console.log(`Server is running on port ${port}!`));


// const express = require('express')
// const app = express()
// const dotenv = require('dotenv')
// const body_parser = require('body-parser')
// const cors = require('cors')
// const db_connect = require('./utils/db')
// const advertisementRoutes = require('./routes/advertisement');

// dotenv.config()


// app.use(body_parser.json())

// if (process.env.mode === 'production') {
//     app.use(cors({
//     origin: ["https://news-portal-admin.vercel.app", "https://news-portal-admin-hjo9.vercel.app"],
//     credentials: true // Allow credentials
//     }));
// } else {
//     app.use(cors({
//         origin: ["http://localhost:5173"]
//     }));
// }


// app.use('/api/advertisement', advertisementRoutes);


// app.use('/', require('./routes/authRoutes'))
// app.use('/', require('./routes/newsRoute'))
// app.get('/', (req, res) => res.send('Hello World!'))

// const port = process.env.port

// db_connect()

// app.listen(port, () => console.log(`server is running on port ${port}!`))
