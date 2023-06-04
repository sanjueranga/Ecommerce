const app = require("./app")
const dotenv = require('dotenv')
const connectDatabase = require('./config/dbconfig')

dotenv.config({path:`config/.env`})

connectDatabase();



const server = app.listen(process.env.PORT, function() {
    console.log(`Server started on port ${process.env.PORT}`);
  });

  // handle unhandled promise rejection

process.on('unhandledRejection',err=>{
  console.log('ERROR: $(err.message)');
  console.log('Shutting down the server due to unhandled Promise rejection')
  server.close(()=>{
    process.exit(1)
  })
})