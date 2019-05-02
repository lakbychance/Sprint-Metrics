let express = require('express')
let fs = require('fs')
let app= express()
let router = express.Router()
let bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.get("/read",function(req,res)
{
    let dataTotal=[]
fs.readdir("sprintData",(err,files)=>
{
    let count=-1
    files.map((file,index)=>{
        let pathOfFiles = 'sprintData/'+file
        readData(pathOfFiles).then(data=>{
            count++
            dataTotal.push(data)
            if(count===files.length-1)
            {
                res.send(dataTotal)
            }
        })
        
    })
 
})

})
function readData(pathOfFiles)
{
    return new Promise((resolve,reject)=>
{
    fs.readFile(pathOfFiles,'UTF-8',(err,data)=>
    {
        resolve(data)
    })
})
}
app.post("/save",function(req,res)
{
    let data = req.body;
    let sprintName=req.body.sprint
    fs.writeFile(`./sprintData/${sprintName}.json`,JSON.stringify(data))
    res.send("Created Successfully")
})

app.listen(8080,function()
{
    console.log("listening on port 8080")
})