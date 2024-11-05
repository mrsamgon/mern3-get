require("dotenv").config()


const express = require("express")
const conncetToDatabase = require("./database")
const Blog = require("./model/blogModel")
const app = express()

app.use(express.json()) // for malking understandable for the json

conncetToDatabase()

app.get("/", (req, res)=>{
    // res.send("Hello World")
    res.json({
        message : "This is home page hai"
    })

})

app.post("/blog", async(req,res)=>{

    console.log(req.body)
    // const description = req.body.description
    // const title = req.body.title
    // const image = req.body.image
    // const subtitle = req.body.subtitle
    const {title, subtitle, description, image} = req.body // shortcut method for this 👆
    //if from fron-end data is coming we have to throw this error like this👇👇
    // if(!title || !description || !image || !title || !subtitle ){
    //     return res.status(400).json({
    //         message : " Please provide  title, subtitle , description , image"
    //     })
    // }
    await Blog.create({
        title : title, // right coloum and left one is variable which we mention on the top
        subtitle : subtitle,
        description : description,
        image : image

    })
    res.status(200).json({ // this respose should be always in the last
        message : "Blog API succcesfully hit"
    })
})

app.get("about", (req, res)=>{
    // res.send("Hello World")
    res.status(200).json({
        message : "This is about page"
    })

})

app.listen(process.env.PORT,()=>{
    console.log("NodeJs project has started")
}
)

// mongodb atlas [user] samgon23402 [psw] samgon23402

// mongodb+srv://samgon23402:samgon23402@cluster0.r0qid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0