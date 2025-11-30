import express from "express"
import { createCart, 
    getCart, 
    addProductToCart, 
    deleteProductFromCart, 
    clearCart, 
    updateCartBulk } from "../controllers/carts.controllers.js"

const router = express.Router()

//Carts Endpoints
router.post("/", createCart)
router.get("/:cid", getCart)
router.delete("/:cid", clearCart)
router.put("/:cid", updateCartBulk)
router.post("/:cid/product/:pid", addProductToCart)
router.delete("/:cid/product/:pid", deleteProductFromCart)

export default router