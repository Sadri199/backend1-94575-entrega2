import express from "express"
import http from "http"
import { Server } from "socket.io"
import handlebars from "express-handlebars"
import mongoose from "mongoose"

import homeRouter from "./routes/home.route.js"
import liveProductsRouter from "./routes/realTime.route.js"
import productsRouter from "./routes/products.route.js"
import cartsRouter from "./routes/carts.route.js"

import { ProductManager } from "./managers/productManager.js"

//Main Configurations
const app = express()
const PORT = 8080
const httpServer = http.createServer(app)
const wsServer = new Server(httpServer)

wsServer.on("connection", (socket)=> {
    const clientId = socket.id
    console.log(`New client connected! Client: ${clientId}`)
    socket.emit("connection", "Connected to the server.")
    
    socket.on("products", ()=>{
        const newManager = new ProductManager()
        const getProduct = newManager.getProduct()
        let oldData = getProduct
        getProduct
            .then((data)=>{
                const allProducts = data
                socket.emit("giveProducts", allProducts)
            }).catch((err)=>{
                console.error(err)
        })

    })

    socket.on("EraseProduct", (idData)=>{
        const id = idData
        const newManager = new ProductManager()
        const deleteProduct = newManager.deleteProduct(id)
        deleteProduct
        .then((data) => {
            console.log("Erasing Product " + id)
            socket.emit("productErased", data)
        }).catch((data)=> {
            console.error(data)
        })
    })

    socket.on("createProduct", (data)=> {
        const newProduct = data
        const newManager = new ProductManager()
        const createProduct = newManager.addProduct(data)
        createProduct
        .then((data)=>{
            const getProductByID = newManager.getProductByID(data)
            getProductByID
                .then((data)=>{
                    socket.emit("productCreated", data)
                })
        }).catch((data)=> {
            console.error(data)
        })
    })
})

mongoose.connect("mongodb+srv://alrepedo35_db_user:JAooIGuCVQVFYa32@mycluster.0rd8vu0.mongodb.net/?appName=MyCluster")
.then(()=>{
    console.log("mongooseando")
})
.catch((err)=>{
    console.error(err)
})

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static("public"))
app.use("/", homeRouter)
app.use("/realtimeproducts", liveProductsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

export const openServer = () => {httpServer.listen(PORT, () => {
    console.log(`Server open at ${PORT}`)
    console.log(`Go to http://localhost:8080`)
}) }
