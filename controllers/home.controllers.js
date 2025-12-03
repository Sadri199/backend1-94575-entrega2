import productModel from "../models/products.model.js"

export const getHome = async (req, res) => {
    
    const {limit=0, page=1} = req.query

    try{
        const getProducts = await productModel.find().limit(limit).skip(parseInt((page -1)*limit)).lean()
        const games = {"games": getProducts}
        res.render("home", games)
    }catch(err){
        console.log(err)
    }
}