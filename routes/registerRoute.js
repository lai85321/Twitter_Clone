
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
    res.status(200).render("register");
})

router.post("/",async(req,res,next)=>{
    
    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let username = req.body.username.trim();
    let email = req.body.email.trim();
    let password = req.body.password;

    let payload = req.body; 

    if(firstName && lastName && username && email && password){
        let user= await User.findOne({
            $or: [
                { username:username},
                { email:email}
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Something went wrong."
            res.status(200).render("register",payload);  
        });
        

        if(user == null){
            let data= req.body;
            data.password = await bcrypt.hash(password,10);
            console.log(user)
            //no user found
            User.create(data)
            .then((newUser)=>{
                req.session.user=newUser;
                return res.redirect("/");

            })
        }
        else{
            if(email== user.email){
                payload.errorMessage = "Email already in use."
            }
            else{
                payload.errorMessage = "Username already in use."
            }
            res.status(200).render("register",payload); 
        }
    }

    else{    
        payload.errorMessage = "Please make sure each field has valid value"
        res.status(200).render("register",payload);  
    }
})

module.exports = router;