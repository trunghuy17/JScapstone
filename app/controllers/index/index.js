// import {Cart} from '../../models/Cart.js';
// import Product from '../../models/Product.js';

//get all products

window.onload=function () {
    getAllProducts();
}
// let product= new Product();
let getAllProducts=()=>{
    let promises=axios({
        url:'https://shop.cyberlearn.vn/api/Product',
        method:'GET',
        responseType:'JSON'
    })
    promises.then( (res)=>{
        let products=res.data.content;
        console.log(products);
        renderProducts(products);
    })
    promises.catch( (err)=>{
        console.log(err.response.data);
    })
}

let renderProducts = (products) => {
    let htmlProducts = '';
    for (let prod of products) {
        htmlProducts += `
            <div class="prodCard col-4">
                <div class="card">
                    <img src="${prod.image}" alt="">
                    <h2 class="name">${prod.name}</h2>
                    <p class="shortDes">
                        ${prod.shortDescription}
                    </p>
                    <div class="cardFooter">
                        <a href="./app/views/detail.html?productId=${prod.id}">
                            <button class="buyProd" onclick=(buyNow('${prod.id}'))>
                                Buy now
                            </button>
                        </a>
                        <p class="priceItem">
                            ${prod.price}$
                        </p>
                    </div>
                </div>
            </div>
       `
    }
    document.querySelector("#relateProduct").innerHTML = htmlProducts;


}