import cartModel from "../models/carts.models.js"

export const createCart = async (req,res) => { //Listo
    try{
        const newCart = await cartModel.create({products: []})
        console.log("The cart was created correctly in the Database.")
        res.status(202).send({message: "Cart created correctly!", id: newCart._id})
    } catch (err){
        res.status(500).send({message: "We couldn't create the Cart!", error: err})
        throw err
    }
}

export const getCart = async (req, res)=>{ //Listo
    const id = req.params.cid

    try{
        const query = await cartModel.findById(id)
        console.log(`Retrieving Cart ${id} correctly`)
        res.status(200).send({cart: query})
    } catch (err){
        res.status(404).send({message: "That ID isn't in the Database or is in an incorrect format, try again."})
        throw err
    }
}

export const addProductToCart = async (req, res)=>{ //Listo, Populate???
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    let flag = false

    try{
        if(quantity < 1){
            flag = true
            throw new Error ("Quantity must be 1 or Higher.")
        }
        const update = await cartModel.findByIdAndUpdate(cid, {products: [{product: pid, quantity}]})
        const query = await cartModel.findById(cid)
        console.log(`Cart updated correctly! We added ${quantity} units of the Product ${pid} !`)
        res.status(200).send({cart: query})
    } catch (err){
        if (flag){
            res.status(500).send({message: err.message})
            throw err
        }
        res.status(404).send({message: "That ID isn't in the Database or is in an incorrect format, try again."})
        throw err
    }
}