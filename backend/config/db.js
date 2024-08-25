// config/db.js

// mongodb compass localhost
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const uri = 'mongodb://localhost:27017/sentinel'; // Example URI, adjust as per your setup
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
        const uri = 'mongodb+srv://atharabbas11786:1234@steganography.2rv6k.mongodb.net/?retryWrites=true&w=majority&appName=steganography';
        const conn = await mongoose.connect(uri, {
            // Deprecated options removed
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
