const productsDOM = document.querySelector('.products')
const loadingDOM = document.querySelector('.loding-text')

// load products
const showProducts = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {
            data: { products },
        } = await axios.get('/api/v1/products/static')
        if (products.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }

        const allProducts = products.map((product) => {
            const { name, price, featured, rating, createdAt, company, _id: productID } = product
            return `<div class=single-product>
                        <div><h3>${name}</h3></div>
                        <div>
                            <h5>Price: ${price}</h5>
                            <h5>Featured: ${featured}</h5>
                            <h5>Rating: ${rating}</h5>
                            <h5>cratedAt: ${createdAt}</h5>
                            <h5>Company: ${company}</h5>
                        </div>
                    </div>`
        }).join('')

        productsDOM.innerHTML = allProducts
    } catch (error) {
        console.log(error)
        productsDOM.innerHTML = '<h5 class="empty-product">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
}

showProducts()