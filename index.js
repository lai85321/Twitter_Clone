const express = require("express");
const app =express();
const port = 3003;
const middleware = require("./middleware");
const path = require("path");
const server = app.listen(port, ()=>console.log("Server listening on port" +port));
const mongoose = require("./database");
const session = require("express-session")

app.set("view engine", "pug");
app.set("views","views");  //if youu need a view, go to the folder views

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret:"hashhash",
    resave:true,
    saveUninitialized:false
}))


//router
const loginRoute = require("./routes/loginRoute");
app.use("/login",loginRoute);
const registerRoute = require("./routes/registerRoute");
app.use("/register",registerRoute);
const logoutRoute = require("./routes/logoutRoute");
app.use("/logout",logoutRoute);

app.get("/", middleware.requireLogin, (req,res,next)=>{
     
    let payload={
        pageTitle : "Home",
        userLoggedin : req.session.user
    }

    res.status(200).render("home",payload);
})