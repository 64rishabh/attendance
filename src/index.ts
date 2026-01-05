import express from "express";
import router from "./routes/routes";

const app = express();
app.use(express.json());

app.get('/home',(req,res)=>{
    res.send("server says heloo!!")
    console.log("on home");
})

app.use('/api',router);
app.listen(3000,()=>{
    console.log("server is on port 3000")
})