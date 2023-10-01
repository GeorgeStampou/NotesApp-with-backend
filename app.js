require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.get("/home", (req,res)=>{
    res.send("HELLO NOTES APP");
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Server is listening on port ${port}...`));