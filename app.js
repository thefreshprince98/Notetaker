const express=require("express");
const fs=require("fs");

const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
// routes
app.get("/",function (req,res) {
    res.sendFile(__dirname +"/public/index.html")
    
});
app.get("/notes", function(req,res){
    res.sendFile(__dirname+"/public/notes.html")
})



app.get("/api/notes", function(req, res) {
    const dbjson=fs.readFileSync(__dirname +"/db/db.json","utf8");
    return res.json(JSON.parse(dbjson));
  });
app.post("/api/notes",function (req,res) {
    var newNotes = req.body;  
    console.log(newNotes); 
    var notes=JSON.parse(fs.readFileSync(__dirname +"/db/db.json","utf8"));
    notes.push(newNotes);
    fs.writeFileSync(__dirname+"/db/db.json",JSON.stringify(notes));
    res.json(newNotes);
    
})

app.listen(3000,function () {
    console.log("localhost:3000")
    
})