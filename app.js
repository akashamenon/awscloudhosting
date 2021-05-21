var express=require('express')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var{studentModel}=require('./models/studentModel')


mongoose.connect("mongodb://mongo:27017/docker-node-mongo",{useNewUrlParser:true})



let app=express()

app.use(bodyParser.urlencoded({ extended:false}))

app.use(bodyParser.json())

app.get('/',(req,res)=>{

    res.send("Welcome to my Website")

})


app.get('/viewall', async (req,res)=>{

    try{

        var result= await studentModel.find()

    res.json(result)

    }

    catch(error)
    {

        res.send(error)

    }

})


app.post('/read',(req,res)=>{

    var studentObject=new studentModel(req.body)

    studentObject.save(
        (error)=>{

            if(error)
            {
                res.send(error)
            }
            else{
                res.json({"status":"success"})
            }
        }
    )


    res.json(studentObject)


})

app.listen( process.env.PORT || 80, ()=>{
    console.log("Server started at http://localhost:3000")
})