const url = "/api/products?limit=3&filterField=category&filterBy=Platformer"

const newPage = 3

const replaced = url.replace("page=2", `page=${3}`)

console.log(replaced)