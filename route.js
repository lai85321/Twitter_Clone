const displayContent = (req,res)=>{
    const url = req.url;
    if(url == '/profile'){
        res.setHeader("Content-Type","text/html");
        res.write("This is a profile page!!");
        return res.end();
    }
    else if(url == '/'){
        res.setHeader("Content-Type","text/html");
        res.write("<h1>Sleep</h1>");
        return res.end();
    }
    else{
        res.setHeader("Content-Type","text/html");
        res.write("page not found");
        return res.end();
    } 
}

module.exports = displayContent;