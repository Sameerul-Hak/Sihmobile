const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path:'./Variables.env'})
const Messageroute=require("./Route/Chatroute");
const Userroute=require("./Route/Userroute");
const app = express();




app.use(express.json());
app.use("/m",Messageroute);
app.use("/u",Userroute);
console.log(process.env.PORT)

const MONGODB_URI = process.env.DBKEY;
console.log(MONGODB_URI);


mongoose.connect(MONGODB_URI).then(console.log("Database connected successfully"))
const PORT = 8000;

 app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});
