const express=require("express")
const cors=require("cors")
const multer=require('multer')
const storage=multer.memoryStorage();
const upload=multer({storage:storage});


const app=new express();
const studmodel=require('./model/student')
const certmodel=require("./model/certdetails");

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
app.listen(4005,(request,response)=>{
    console.log("port is running in 4005")
})

app.get('/',(request,response)=>{
    response.send("hi database")
})
//for saving student data
app.post('/snew',(request,response)=>{
 new studmodel(request.body).save();
 response.send("Record saved successfully")
})
//for retrieving student data
app.get('/sview',async(request,response)=>{
    var data = await studmodel.find();
    response.send(data)
})



//for updating status of student-delete
app.put('/updatestatus/:id',async(request,response)=>{
    let id = request.params.id
    await studmodel.findByIdAndUpdate(id,{$set:{Status:"Inactive"}})
    response.send("record deleted")
    
})

//for modifing the details student
app.put('/sedit/:id',async(request,response)=>{
    let id = request.params.id
    await studmodel.findByIdAndUpdate(id,request.body)
    response.send("record updated")
})

//for saving certificate details
app.post('/certnew/',upload.single('certphoto'),async(request,response)=>{
    const {sid,Qualification}=request.body
    console.log(request.body) 
    const newdata =new certmodel({
    sid,
   Qualification,
    certphoto:{
        
        data:request.file.buffer,
        contentType:request.file.mimeType,
    }
})

await newdata.save();
})
app.get('/cview',async(request,response)=>{

   const result=await certmodel.aggregate([
    {
$lookup:{
    from: 'students',
    localField: 'sid',
    foreignField: '_id',
    as: 'stud'
    },
    },

   ]);
   response.send(result)
})
