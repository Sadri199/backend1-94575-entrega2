import cartModel from "../models/carts.models.js"

export const createCart = async (req,res) => {
    try{
        const newCart = await cartModel.create({products: []})
        console.log("The cart was created correctly in the Database.")
        res.status(202).send({message: "Cart created correctly!", id: newCart._id})
    } catch (err){
        res.status(500).send({message: "We couldn't create the Cart!", error: err})
        throw err
    }
}

export const getCart = async (req, res)=>{
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

export const addProductToCart = async (req, res)=>{ //Arreglado, Populate???
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity
    let flag = false

    try{
        if(quantity < 1){
            flag = true
            throw new Error ("Quantity must be 1 or Higher.")
        }

        const duplicate = await cartModel.find({_id: cid, "products.product": pid})
        console.log(duplicate)

        if(duplicate == []){
            s
        }

        // const update = await cartModel.findByIdAndUpdate(cid, //probar con update solo
        //     {$addToSet: {products: [{product: pid, quantity}]}},
        //     { runValidators: true, new: true}
        //     )
        // console.log(`Cart updated correctly! We added ${quantity} units of the Product ${pid} !`)

        res.status(200).send({cart: duplicate})
        //res.status(200).send({cart: update})
    } catch (err){
        if (flag){
            res.status(500).send({message: err.message})
            throw err
        }
        res.status(404).send({message: "That ID isn't in the Database or is in an incorrect format, try again."})
        throw err
    }
}

export const deleteProductFromCart = async (req, res) => { //Listo
    const cid = req.params.cid
    const pid = req.params.pid
    try{
        const query = await cartModel.findOneAndUpdate(
            {_id: cid},
            {$pull: {products:{product: pid}}},
            {new: true}
        )

        res.status(202).send(query)
    }catch(err){
        res.status(500).send({message: "We couldn't find the product or the cart."})
    }
}

export const clearCart = async (req, res) => {
    const cid = req.params.cid

    try{
        const query = await cartModel.findOneAndUpdate(
            {_id: cid},
            {$pullAll: {}}, // no funciona
            {new: true}
        )

        res.status(202).send({message: "All products erased from cart!", payload:query})
    }catch(err){
        console.log(err)
        res.status(500).send({message: "We couldn't find the product or the cart."})
    }
}