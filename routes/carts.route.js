import express from "express"
import { createCart, getCart, addProductToCart, deleteProductFromCart, clearCart } from "../controllers/carts.controllers.js"

const router = express.Router()

//Carts Endpoints
router.post("/", createCart)
router.post("/:cid/product/:pid", addProductToCart)
router.get("/:cid", getCart)
router.delete("/:cid/product/:pid", deleteProductFromCart)
router.delete("/:cid", clearCart)

export default router