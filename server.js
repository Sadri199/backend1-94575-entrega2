import express from "express"
import http from "http"
import { Server } from "socket.io"
import handlebars from "express-handlebars"

import homeRouter from "./routes/home.route.js"
import liveProductsRouter from "./routes/realTime.route.js"
import productsRouter from "./routes/products.route.js"
import cartsRouter from "./routes/carts.route.js"

import { ProductManager } from "./managers/productManager.js"

//Main Configurations
const app = express()
const PORT = 8080
const httpServer = http.createServer(app)
export const wsServer = new Server(httpServer)

wsServer.on("connection", (socket)=> {
    const clientId = socket.id
    console.log(`New client connected! Client: ${clientId}`)
    socket.emit("connection", "Connected to the server.")
    
    socket.on("products", ()=>{
        const newManager = new ProductManager()
        const getProduct = newManager.getProduct()
        getProduct
            .then((data)=>{
                const allProducts = data
                socket.emit("giveProducts", allProducts) //Yeah i know I'm cheating but i can't make it work on controllers/realTime.controller.js
            }).catch((err)=>{
                console.error(err)
            })
        
    })
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
