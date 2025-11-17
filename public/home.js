const renderProduct = document.getElementById("render-product")
const form = document.getElementById("createProduct")

const clientConnection = io()

// if (window.location.href.includes("http://localhost:8080/realtimeproducts")){} //Yeah I know that this hardcode will not work if port or domain changes

clientConnection.on("connection", (data)=>{
    console.log(data)
})

clientConnection.emit("products", "Give me the products!")

clientConnection.on("giveProducts", (data)=> {
    const products = data

    Object.entries(products.games).map(game=>{
        const title = game[1].title
        const description = game[1].description
        const code = game[1].code
        const price = game[1].price
        const status = game[1].status
        const stock = game[1].stock
        const category = game[1].category
        const thumbnail = game[1].thumbnail
        const gameId = game[1].id

        const card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("id", `${gameId}`)
        card.style.width = "18rem"
        card.innerHTML = `<img class="card-img-top" src=${thumbnail[0]} alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Name of the Game: ${title}</h5>
            <p class="card-text">Description of the Game: ${description}</p>
            <p class="card-text">SKU: ${code}</p>
            <p class="card-text">Price: ${price} Goon Coins</p>
            <p class="card-text">Active: ${status}</p>
            <p class="card-text">Current Stock: ${stock}</p>
            <p class="card-text">Category: ${category}</p>
            <button id=${"eraser" + "-" + gameId} type="button" class="btn btn-danger eraser">Delete Product</button>
        </div>`
        document.getElementById("render-product").appendChild(card)
        })

        const eraserButtons = document.querySelectorAll("button.eraser")
        eraserButtons.forEach(button => {
            button.addEventListener("click", ()=>{
                const mainDiv = button.parentNode.parentNode
                clientConnection.emit("EraseProduct", mainDiv.id)
                clientConnection.on("productErased", ()=>{
                    renderProduct.removeChild(mainDiv)
                })
            })
        })
})

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const newProduct = {
        title: form.elements.title.value,
        description: form.elements.description.value,
        code: form.elements.code.value,
        price: form.elements.price.value,
        status: form.elements.status.checked,
        stock: form.elements.stock.value,
        category: form.elements.category.value,
        thumbnail: [form.elements.thumbnail.value]
    }
    clientConnection.emit("createProduct", newProduct)
    clientConnection.on("productCreated", (data)=>{
        const addedProduct = data
        const card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("id", `${addedProduct.id}`)
        card.style.width = "18rem"
        card.innerHTML = `<img class="card-img-top" src=${addedProduct.thumbnail[0]} alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">Name of the Game: ${addedProduct.title}</h5>
            <p class="card-text">Description of the Game: ${addedProduct.description}</p>
            <p class="card-text">SKU: ${addedProduct.code}</p>
            <p class="card-text">Price: ${addedProduct.price} Goon Coins</p>
            <p class="card-text">Active: ${addedProduct.status}</p>
            <p class="card-text">Current Stock: ${addedProduct.stock}</p>
            <p class="card-text">Category: ${addedProduct.category}</p>
            <button id=${"eraser" + "-" + addedProduct.id} type="button" class="btn btn-danger eraser">Delete Product</button>
        </div>`
        document.getElementById("render-product").appendChild(card)

        const eraserButton = document.getElementById("eraser" + "-" + addedProduct.id)
        eraserButton.addEventListener("click", ()=>{
                const mainDiv = eraserButton.parentNode.parentNode
                clientConnection.emit("EraseProduct", mainDiv.id)
                clientConnection.on("productErased", ()=>{
                    mainDiv.remove()
                })
            })
    })
})