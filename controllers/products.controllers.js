import productModel from "../models/products.model.js"

export const getProduct = async (req, res)=> {

    const {page=1, sortBy="price", sort=1, limit=0} = req.query

    const queryField = req.query.filterField
    const queryTerm = req.query.filterBy
    const queryObject = {}
    queryObject[queryField] = queryTerm

    try{
        const query = await productModel.find(queryObject).limit(limit).skip(parseInt((page -1)*limit)).sort([[sortBy, parseInt(sort)]])
        console.log("Accesing the Database correctly!")

        const count = await productModel.countDocuments(queryObject)
        const intPage = parseInt(page)
        const url = req.originalUrl

        const response = {
            status: "success",
            payload: query,
            totalPages: limit == 0 ? 0 : Math.ceil(count / limit),
            prevPage: intPage-1 < 1 ? "There are no more pages!" : intPage -1,
            nextPage: intPage >= (count/limit) || limit == 0 ? "There are no more pages!" : intPage +1,
            page: intPage,
            hasPrevPage: intPage-1 < 1 ? false : true,
            hasNextPage: intPage >= (count/limit) || limit == 0 ? false : true,
            prevLink: intPage-1 < 1 ? null : `${url.replace(`page=${intPage}`, `page=${intPage -1}`)}`,
            nextLink: intPage >= (count/limit) || limit == 0 ? null : `${url.replace(`page=${intPage}`, `page=${intPage +1}`)}`
        }

        res.send(response).status(200)
    }
    catch(error){
        res.status(500).send({status: "error",payload: error})
    }
}

export const createProduct = async (req, res)=> {
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

export const getProductByID = async (req, res)=> {
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

export const updateProduct = async (req, res)=> {
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

export const deleteProduct = async (req, res) => {
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