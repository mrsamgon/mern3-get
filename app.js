require("dotenv").config()


const express = require("express")
const conncetToDatabase = require("./database")
const Blog = require("./model/blogModel")
const app = express()
const {multer, storage} = require("./middleware/multerConfig")
const upload = multer({storage : storage})
const fs = require("fs") // file system

app.use(express.json()) // for malking understandable for the json

conncetToDatabase()

app.get("/", (req, res)=>{
    // res.send("Hello World")
    res.json({
        message : "This is home page hai"
    })

})

app.post("/blog", upload.single("image"), async (req,res)=>{
    // const description = req.body.description
    // const title = req.body.title
    // const image = req.body.image
    // const subtitle = req.body.subtitle
    const {title, subtitle, description, image} = req.body // shortcut method for this 👆
    console.log(req.body)
    console.log(req.body.title)
   
    const filename = req.file.filename


    //if from fron-end data is coming we have to throw this error like this👇👇
    if(!title || !description || !subtitle ){
        return res.status(400).json({
            message : " Please provide  title, subtitle , description , image"
        })
        // return   //we can put anyware up and down
    }
     await Blog.create({
        title : title, // right coloum and left one is variable which we mention on the top
        subtitle : subtitle,
        description : description,
        image : filename

    })
    res.status(200).json({ // this respose should be always in the last
        message : "Blog API succcesfully hit"
    })
})

app.get("/blog", async (req, res)=>{
   const blogs = await Blog.find() // returns in array
   res.status(200).json({
    message : "Blogs fetched successfully",
    data : blogs
   })
})

app.get("about", (req, res)=>{
    res.status(200).json({
        message : "This is about page"
    })

})

//day13
app.get("/blog/:id", async(req, res)=>{
    const id = req.params.id //this will show what user sended
    const blog = await Blog.findById() // object
    if(!blog){
        res.status(404).json({
            message : "Data not found please check "
        })
    }else{
        res.status(200).json({
            message : "Fetched Successfully",
            data : blog
        })
    }
})
app.delete("/blog/:id", async (req, res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image


    fs.unlink(`storage/${imageName}`, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("file deleted succesfully")
        }
        
    })
    await Blog.findByIdAndDelete(id)
   res.status(200).json({
    message : "Blog deleted succesfully"
   })

})

//update
app.patch('/blog/:id',upload.single("image"), async (req, res)=>{
    const id = req.params.id
    const {title, subtitle, description} = req.body
    let NewimageName;
    if(req.file){
        NewimageName = req.file.filename
        const blog = await Blog.findById(id)
        const imageName = blog.image


        fs.unlink(`storage/${imageName}`, (err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("file deleted succesfully")
            }
        
    })
    }

   await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle,
        description : description,
        image : NewimageName
        
    })
    res.status(200).json({
        message : "Blog Updated Successfully"
    })
})


app.use(express.static('./storage'))

app.listen(process.env.PORT,()=>{
    console.log("NodeJs project has started")
}
)

