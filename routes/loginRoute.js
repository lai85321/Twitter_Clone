const express = require("express");
const app = express();
const router = express.Router();
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");

app.set("view engine", "pug");
app.set("views","views");

app.use(express.json());
app.use(express.urlencoded({extended: false}))

router.get("/",(req,res,next)=>{
    res.status(200).render("login");
})

router.post("/",async(req,res,next)=>{
    let payload = req.body;

    if(req.body.logUserName && req.body.logUserPassword){
    
    let user= await User.findOne({
        $or: [
            { username:req.body.logUserName},
            { email:req.body.logUserName}
        ]
    })
    .catch((error)=>{
        console.log(error);
        payload.errorMessage = "Something went wrong."
        res.status(200).render("/login",payload);
    });
    

    if (user != null){
        let result = await bcrypt.compare(req.body.logUserPassword, user.password)
        if (result===true){
            req.session.user=user;
            return res.redirect("/")
        }    
    }
    payload.errorMessage = "Login credentials incorrect."
    return res.status(200).render("login",payload);
   }
   payload.errorMessage = "Make sure each field has a valid value."
   res.status(200).render("login",payload)
})

module.exports = router;