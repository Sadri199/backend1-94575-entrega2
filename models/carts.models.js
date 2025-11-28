import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products: [{product: String, quantity: Number}]
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel