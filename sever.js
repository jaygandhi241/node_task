const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const db = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes=require("./router/admin/userAuthRoutes/userAuth");
const taskRoutes=require('./router/admin/taskRoutes/taskRoutes');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
db()

app.use('/', userRoutes)
app.use('/task', taskRoutes)
app.use("*",(req,res)=>{res.redirect("/signup")})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


