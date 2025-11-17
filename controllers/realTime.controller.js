import { ProductManager } from "../managers/productManager.js"

export const getLiveProducts = (req, res) => { //I couldn't make it work ╰（‵□′）╯
    // io.on("connection", (socket)=> {
    //     const clientId = socket.id
    //     console.log(`New client connected! Client: ${clientId}`)
    //     socket.emit("connection", "Connected to the server.")
        
    //     socket.on("products", ()=>{
    //         const newManager = new ProductManager()
    //         const getProduct = newManager.getProduct()
    //         getProduct
    //             .then((data)=>{
    //                 const allProducts = data
    //                 socket.emit("giveProducts", allProducts)
    //             }).catch((err)=>{
    //                 console.error(err)
    //         })
    //     })

    //     socket.on("EraseProduct", (idData)=>{
    //         const id = idData
    //         const newManager = new ProductManager()
    //         const deleteProduct = newManager.deleteProduct(id)
    //         deleteProduct
    //         .then((data) => {
    //             console.log("Erasing Product " + id)
    //             socket.emit("productErased", data)
    //         }).catch((data)=> {
    //             console.error(data)
    //         })
    //     })

    //     socket.on("createProduct", (data)=> {
    //         const newManager = new ProductManager()
    //         const createProduct = newManager.addProduct(data)
    //         createProduct
    //         .then((data)=>{
    //             const getProductByID = newManager.getProductByID(data)
    //             getProductByID
    //                 .then((data)=>{
    //                     socket.emit("productCreated", data)
    //                 })
    //         }).catch((data)=> {
    //             console.error(data)
    //         })
    //     })
    // })

    res.render("realTimeProducts", {})
}