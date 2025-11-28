import { CartManager } from "../managers/cartManager.js"
import cartModel from "../models/carts.models.js"

export const createCart = async (req,res) => {

    const newCart = await cartModel.create({}) //no funca
    res.send("Cart created.")
    // const newCart = {
    //     products:  req.body.products,
    // }
    // const newCartManager = new CartManager(newCart)
    // const cartCreate = newCartManager.createCart(newCart)
    // cartCreate
    //     .then((id)=> {
    //         res.status(200)
    //         res.send({Message: `Your cart was created correctly! ID: ${id}`})
    //     })
    //     .catch((data)=> {
    //         res.status(500)
    //         res.send({Error: `${data.err}`})
    //     })
}

export const getCart = (req, res)=>{
    const id = req.params.cid
    const newCartManager = new CartManager()
    const cartGet = newCartManager.getCart(id)
    cartGet
        .then((data) =>{
            res.status(200)
            res.send(data)
        })
        .catch((data)=> {
            res.status(500)
            res.send({Error: `${data}`})
        })
}

export const addProductToCart = (req, res)=>{
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    
    const newCartManager = new CartManager()
    const productAdd = newCartManager.addToCart(cid, pid, quantity)
    productAdd
        .then((data) =>{
            res.status(200)
            res.send({Message: data})
        })
        .catch((err)=> {
            res.status(500)
            res.send({Error: err.message})
        })
}