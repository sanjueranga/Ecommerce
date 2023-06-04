const mongoose = require('mongoose');




const connectDatabase =()=>{
     main().catch(err => console.log(err));
    async function main() {
    await mongoose.connect(process.env.DB_LINK);
    console.log("MongoDB succesfully connected");

}
}

module.exports = connectDatabase