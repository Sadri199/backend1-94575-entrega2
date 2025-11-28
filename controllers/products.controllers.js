import productModel from "../models/products.model.js"

export const getProduct = async (req, res)=> { //Agregar skip, limit sort todas las cosas, manipular la response
    try{
        const query = await productModel.find({})
        console.log("Accesing the Database correctly!")
        res.send(query).status(200)
    }
    catch(error){
        res.send(error).status(500)
    }
}

export const createProduct = async (req, res)=> { //Listo
    const {title, description, code, price, status, stock, category, thumbnail} = req.body
    
    try{
        const dbCreate = await productModel.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        })
        res.send({message: "Product created succesfully", product: dbCreate}).status(200)
    } catch (error) {
        res.status(500).send({message: "We couldn't create the product!", error: error.message})
    }
}

export const getProductByID = async (req, res)=> { //Listo
    const id = req.params.pid

    try{
        const query = await productModel.findById(id)
        console.log(`Retrieving product ${id} correctly`)
        res.status(200).send({product: query})
    }
    catch(err){
        res.status(404).send({message: "That ID isn't in the Database or is in an incorrect format, try again."})
        throw err
    }
}

export const updateProduct = async (req, res)=> { //Listo
    const id = req.params.pid
    const {...data} = req.body

    try{
        const update = await productModel.findByIdAndUpdate(id, {...data})
        const query = await productModel.findById(id)
        console.log(`Editing product ${id} correctly!`)
        res.status(200).send({product: query})
    }catch (err){
        res.status(404).send({message: "That ID isn't in the Database or is in an incorrect format, try again."})
        throw err
    }
}

export const deleteProduct = async (req, res) => { //Listo
    const id = req.params.pid

    try{
        const deleteMe = await productModel.findByIdAndDelete(id)
        if(!deleteMe){
            throw new Error ("ID doesn't exists")
        }
        console.log(`Deleting product ${id} correctly!`)
        res.status(200).send({message: `Product with ${id} deleted correctly!`})
    }catch (err){
        res.status(404).send({message: `Product with ${id} doesn't exist!`})
        throw err
    }
}