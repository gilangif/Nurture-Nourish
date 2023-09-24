if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3000
const router = require("./routes")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully")
  })
  .on("error", function (err) {
    console.log("Error", err)
  })

app.get("/", (req, res) => res.send("Hello World!"))
app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
