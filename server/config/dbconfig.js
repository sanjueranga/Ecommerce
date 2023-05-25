const mongoose = require('mongoose');



const connectDatabase =()=>{
     main().catch(err => console.log(err));
    async function main() {
    await mongoose.connect(process.env.DB_LINK);

}
}

module.exports = connectDatabase