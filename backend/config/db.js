// config/db.js
// mongodb compass localhost
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const uri = 'mongodb://localhost:27017/sentinel';
//         const conn = await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;



// config/db.js
// mongodb atlas online
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        // Debugging line to verify uri value
        console.log('MongoDB URI:', uri);
        
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
