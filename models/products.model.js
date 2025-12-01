import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        min: [1, "Must be 1 or higher!"],
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        min: [1, "Must be 1 or higher!"],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: [String]
})

const productModel = mongoose.model("products", productSchema)

export default productModel