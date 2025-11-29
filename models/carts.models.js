import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products: [{product: {type: String}, //I dont understand why this doesn't work
        quantity: {type: Number, min: 1
        },
        _id: false}]
    
})

const cartModel = mongoose.model("carts", cartSchema)

// const functionA = async () => {
//     await mongoose.connection.collections['carts'].drop((error) => {
//   if (error) console.error('Drop failed', error);
//   else console.log('Successfully dropped collection');
// });
// }

// functionA()

export default cartModel