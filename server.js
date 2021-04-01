const express = require("express")
const app = express()
const mongoose = require("mongoose")

//Models
const Blog = require("./models/Blog")

//Database URI
const dbURI = "mongodb+srv://samin:samin@cluster0.8dlg5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/blogs", (req, res) => {
    Blog.find()
        .then(blogs => {
            res.render("blogs", { blogs })
        })
})

app.get("/blogs/create", (req, res) => {
    res.render("create-blog")
})

//POST request handlers
app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(result => {
            res.redirect("/blogs")
        })
        .catch(err => console.error(err))
})

//DELETE request handlers
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(response => {
            res.json(response)
        })
})

app.listen(3000, () => {
    mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    const db = mongoose.connection
    db.on("error", err => {console.log(err)})
    db.once("open", () => {console.log("Connected to database")})
})