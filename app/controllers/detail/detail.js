import Product  from '../../models/Product.js';

//get by id product

let product= new Product();

let getByIDProduct =(id)=>{
    let promises = axios({
       url:`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
       method:'GET',
       responseType:'JSON'
    })

    promises.then((res)=>{
       let prodById= res.data.content;
       for(let key in prodById){
         product[key]=prodById[key]; 
       }
       renderView(product);
       renderRelatedProducts(product);
      
    })

    promises.catch((err)=>{
       console.log(err.response.data);
    })
    
}


let renderView=()=>{
   let img= document.querySelector(".productImg");
   let name= document.querySelector("#nameItem");
   let description= document.querySelector("#descriptionItem");
   let sizeItem= document.querySelector("#sizeItem");
   let price = document.querySelector("#priceItem");
    
   img.innerHTML=`<img src="${product.image}"alt="">`
   name.innerHTML=product.name;
   description.innerHTML=product.description;
   let htmlSize='';
   for(let size of product.size){
    htmlSize+=`
    <div class="swapper-prodSize">
        <button class="size " onclick=(getIdItem('${product.id},${size}'))>${size}</button>
    </div>
    `
   }
   sizeItem.innerHTML=htmlSize;
   price.innerHTML=product.price+'$'; 
}
  
// document.querySelector("#btnAddToCart").onclick=()=>{
//     let count=document.querySelector("#countItem");
//     let numberItem = document.querySelector("#numberItem");
//     numberItem.innerHTML=`(${count.innerHTML})`;
// }

//increase the number of products
document.querySelector("#upItem").onclick=()=>{
    let count=document.querySelector("#countItem");
    let currentCount= Number(count.innerHTML);
    let  quantity =product.quantity;
    if(currentCount > quantity){
        alert("sold out")
    } else{
        currentCount +=1;
    } 
    count.innerHTML= currentCount;
    
}

//reduce the number of products
document.querySelector("#downItem").onclick=()=>{
    let count=document.querySelector("#countItem");
    let currentCount= Number(count.innerHTML);
    if(currentCount <=1){
        currentCount;
        console.log("invalid")
    } else {     
        currentCount-=1;
    }
    count.innerHTML= currentCount;
}

//  let addToCart=(prodById,count)=>{
//     alert("Add to cart")
//  }

// //render relatedProducts
// function buyNow(id){
//     console.log(id);
// }


let renderRelatedProducts = (product)=>{
    let relatedProducts=product.relatedProducts;
    let htmlRelatedProducts='';
    for(let prod of relatedProducts){
       htmlRelatedProducts+=`
            <div class="prodCard col-4">
                <div class="card">
                    <img src="${prod.image}" alt="">
                    <h2 class="name">${prod.name}</h2>
                    <p class="shortDes">
                        ${prod.shortDescription}
                    </p>
                    <div class="cardFooter">
                        <button class="buyProd" onclick=(buyNow('${prod.id}'))>
                            Buy now
                        </button>
                        <p class="priceItem">
                            ${prod.price}$
                        </p>
                    </div>
                </div>
            </div>
       `
    }
    console.log(htmlRelatedProducts)
    document.querySelector("#relateProduct").innerHTML = htmlRelatedProducts;
}


let buyNow=(id)=>{
    console.log(id)
}



window.onload= function(){
    getByIDProduct(4);
}

