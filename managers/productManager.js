import fs from "fs/promises"

export class ProductManager {

    constructor(title="Bootleg", description="Placeholder", code="BTLG-0", price=100, status=true, stock=13, category="Action", thumbnail=["fakeurl"]){
        this.id = Math.floor(Math.random() * (5000000 - 100) + 100) 
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnail = [thumbnail]
    }

    async addProduct ({...data}) {
        data.id = this.id

        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const currentData = getJson
            const parsed = JSON.parse(currentData)
            parsed.games.push(data)
            const stringify = JSON.stringify(parsed)
            const addJson = await fs.writeFile("./db/products.json", stringify)
            console.log("products.json created or edited!")
            return data.id
        } catch (err){
            console.log("Something went wrong creating or updating the file: " + err)
            throw new Error ("Internal Server Error, we couldn't add that product.") 
        }
    }

    async getProduct () {
        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            return convertJson
        } catch (err){
            err.message = "Internal Server Error, we couldn't retrieve the Database."
            console.log("Something went wrong reading the file: " + err)
            throw err
        }
    }

    async getProductByID (id) {
        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            const arrayGames = convertJson.games
            const filteredGame = arrayGames. filter(game => game.id == id)
            if(filteredGame.length == 0){
                throw new Error ("Not a valid Cart ID!")
            }
            for (let i = 0; i < filteredGame.length; i++){
                return filteredGame[i]
            }
        }catch (err){
            console.log("Something went wrong while retrieving the file: " + err)
            throw err 
        }
    }

    async updateProduct (idGame, data){
        try{
            const allProducts = await this.getProduct()
            const arrayGames = allProducts.games
            const oldProduct = arrayGames.filter(game => game.id == idGame)
            if(oldProduct.length == 0){
                throw new Error ("Not a valid Cart ID!")
            }
            const popProduct = oldProduct.pop()

            const {id, ...rest} = data
            const updatedProduct = {...popProduct, ...rest}

            arrayGames.splice(arrayGames.findIndex(game => game.id == idGame), 1)
            arrayGames.push(updatedProduct)

            const stringify = JSON.stringify(allProducts)
            const addJson = await fs.writeFile("./db/products.json", stringify)
            console.log("products.json edited succesfully!")
            return `Game with id ${idGame} updated correctly!`
        }catch(err){
            console.log("Something went wrong while editing the file: " + err)
            throw err
        }
    }

    async deleteProduct (id){
        try{
            const getJson = await fs.readFile("./db/products.json", {encoding: "utf8"})
            console.log("Reading file...")
            const convertJson = JSON.parse(getJson)
            const arrayGames = convertJson.games
            const findId = arrayGames.findIndex(game => game.id == id)
            if(findId == -1){
                throw new Error ("Not a valid ID!")
            }
            arrayGames.splice(findId, 1)

            const stringify = JSON.stringify(convertJson)
            const addJson = await fs.writeFile("./db/products.json", stringify)
            console.log("products.json edited succesfully!")
            return `Game with id ${id} removed correctly!`
        }catch(err){
            console.log("Something went wrong while removing the product: " + err)
            throw err
        }
    }
}
