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

export const addProductToCart = async (req, res)=>{
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

        if(duplicate.length == 0){
            const update = await cartModel.findByIdAndUpdate(cid,
            {$addToSet: {products: [{product: pid, quantity}]}},
            { runValidators: true, new: true}
            )
            console.log(`Cart updated correctly! We added ${quantity} units of the Product ${pid} !`)
            res.status(200).send({message: `Product ${pid} added to the cart correctly!`,cart: update})
        }else{
            const update = await cartModel.findOne({_id: cid}, 
                {products: {$elemMatch: {product: pid}}})
                update.products[0].quantity = quantity
            
            await update.save()
            res.status(200).send({message: `Product ${pid} edited correctly!`,cart: update})
        }
    } catch (err){
        if (flag){
            res.status(500).send({message: err.message})
            throw err
        }
        res.status(404).send({message: "That ID isn't in the Database or is in an incorrect format, try again."})
        throw err
    }
}

export const deleteProductFromCart = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    try{
        const validate = await cartModel.findOne({_id: cid, "products.product": pid})
        console.log(validate)
        if(!validate){
            res.status(404).send({status: "error", message: "Product doesn't exist or is already erased from the cart."})
        }else{
            const query = await cartModel.findOneAndUpdate(
                {_id: cid},
                {$pull: {products:{product: pid}}},
                {new: true}
            )
            res.status(202).send({status: "success", message: "Product erased correctly", payload: query})
        }
    }catch(err){
        res.status(500).send({message: "We couldn't find the product or the cart."})
    }
}

export const clearCart = async (req, res) => {
    const cid = req.params.cid

    try{
        const query = await cartModel.findOneAndReplace(
            {_id: cid},
            {products: []},
            {new: true}
        )

        res.status(202).send({message: "All products erased from cart!", payload:query})
    }catch(err){
        console.log(err)
        res.status(500).send({message: "We couldn't clear the cart."})
    }
}

export const updateCartBulk = async (req, res) => {
    const cid = req.params.cid
    const newProducts = req.body

    try{
        const query = await cartModel.find({_id: cid})

        const compareArrays = (a, b) => {
            return JSON.stringify(a) === JSON.stringify(b);
            }
        
        const transformListA = newProducts.products.map(item=>item.product)
        const transformListB = query[0].products.map(item=>item.product)

        const validate = compareArrays(transformListA, transformListB)

        if(!validate){
            res.status(404).send({status: "error", message: "This endpoint is only to update quantities of already existing products in the cart, it isn't for adding products to the cart."})
        }else{
            const replace = await cartModel.findOneAndReplace({_id: cid},
                {products: newProducts.products},
                {runValidators: true, new: true}
            )
            res.status(200).send({status: "success", payload: replace})
        }
    }catch (err){
        console.error(err)
        res.status(500).send({status: "error", message: err})
    }
}  