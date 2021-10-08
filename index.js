const express = require("express");
const path = require("path")
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')))
app.get('/',(req,res)=>{
    res.sendFile("/index.html");
})
app.get('/home',(req,res)=>{
    res.sendFile(__dirname+"/static/home.html");
})
app.post('/login', function (req, res) {
    if (req.body.username === "admin" && req.body.password === "admin") {
        res.json({ code: 200 });
    }
    else {
        res.json({ code: 400 });
    }
})

app.listen(PORT, function () {
    console.log('Server Running On PORT : ' + PORT);
})