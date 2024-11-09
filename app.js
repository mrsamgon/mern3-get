require("dotenv").config()


const express = require("express")
const conncetToDatabase = require("./database")
const Blog = require("./model/blogModel")
const app = express()
const {multer, storage} = require("./middleware/multerConfig")
const upload = multer({storage : storage})

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
   const blogs = await Blog.find()
   res.status(200).json({
    message : "Blogs fetched successfully",
    data : blogs
   })
})

app.get("about", (req, res)=>{
    // res.send("Hello World")
    res.status(200).json({
        message : "This is about page"
    })

})

app.use(express.static('./storage'))

app.listen(process.env.PORT,()=>{
    console.log("NodeJs project has started")
}
)

// mongodb atlas [user] samgon23402 [psw] samgon23402

// mongodb+srv://samgon23402:samgon23402@cluster0.r0qid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0