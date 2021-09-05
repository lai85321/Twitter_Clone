const express = require("express");
const app = express();
const router = express.Router();
const User = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({extended: false}))

router.get("/",(req,res,next)=>{
    if(req.session){
        req.session.destroy(()=>{
            res.status(200).render("login");
        })
    }
    
})



module.exports = router;