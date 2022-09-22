const express = require("express");
const cors = require("cors");
const router = require("./routes/user.route");
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());


// user route
app.use("/user",router);

app.get("/",(req,res) => {
    console.log("This is assignment 1 node js crash course ");
})


app.listen(PORT);