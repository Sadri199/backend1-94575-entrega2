const printButton = document.getElementById("print-btn")

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
        <button id="eraser" type="button" class="btn btn-danger">Delete Product</button>
    </div>`
    const renderProduct = document.getElementById("render-product").appendChild(card)
    })
    const eraser = document.getElementById("eraser")
    eraser.addEventListener("click", ()=>{ //Continuar desde acá, la idea es tomar el ID y mandarlo por Emit, luego en Server tiene que borrar el producto
        const mainDiv = eraser.parentNode.parentNode
        console.log(mainDiv.id)
    })
})

printButton.addEventListener("click", ()=>{
    clientConnection.emit("products", "Give me the products!")
    console.log("Yeah, I know it's lame but i can't figure how to make the server check if products.json changed to re send the emit")
    printButton.innerText = "Press me to reload the products again!"
})

