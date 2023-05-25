const app = require("./app")
const dotenv = require('dotenv')
const connectDatabase = require('./config/dbconfig')

dotenv.config({path:`config/.env`})

connectDatabase();



app.listen(process.env.PORT, function() {
    console.log(`Server started on port ${process.env.PORT}`);
  });