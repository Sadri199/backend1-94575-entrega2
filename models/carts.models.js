import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products: [{product: String, 
        quantity: {type: Number, 
            // validate: {validator: function validator (value){ //averiguar porqué falla
            //     return value > 0
            // },
            // message: "Quantity must be 1 or higher."}
        },
        _id: false}]
    
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel