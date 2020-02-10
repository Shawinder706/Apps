const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongo_url');

const dbConnect = async () => {
    try {
        await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log("mongodb connected succesfully");
    }
    catch (err) {
        console.log(err.message);
        // exit the process mongodb connection is failed
        process.exit(1)
    }
}

module.exports = dbConnect;