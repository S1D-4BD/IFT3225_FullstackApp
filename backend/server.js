require("dotenv").config();
const express= require("express");
const cors = require("cors");
const connectDB = require("./services/mongoose"); 
const user = require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());
connectDB().catch(err =>console.log(err));

app.use("/users", user);
//app.use("/products", product);
const PORT = process.env.PORT || 8383;

app.listen(PORT, () =>{
   console.log(`Server listening at port ${PORT}`)});
