const express = require('express');
const routes = require('./routes');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(routes);

//app.listen(3333);
init();

async function init() {
  try {
    app.listen(3333, () => {
      console.log("Express App Listening on Port 3333");
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
