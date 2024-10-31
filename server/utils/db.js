// const mongoose = require('mongoose')
// const db_connect = async () => {
//     try {
//         if (process.env.mode === 'production') {
//             await mongoose.connect(process.env.db_production_url)
//             console.log('Poduction database connect')
//         } else {
//             console.log('Ok')
//             await mongoose.connect(process.env.db_local_url)
//             console.log('Local database connect')
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = db_connect


const mongoose = require('mongoose');

const db_connect = async () => {
    try {
        const dbUrl = process.env.mode === 'production'
            ? process.env.db_production_url
            : process.env.db_local_url;
        
        if (!dbUrl) throw new Error('Database URL is not set in environment variables');

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Connected to the ${process.env.mode === 'production' ? 'Production' : 'Local'} database.`);
    } catch (error) {
        console.error('Database connection error:', error.message || error);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = db_connect;
