export class Cart {
    arrProduct = [];

    total = function () {
        return this.arrProduct.reduce((total, item) => {
            for (let key in item) {
                if (key == 'price') {
                    total += item[key] * item['countItem'];
                }
            }
            return total;
        }, 0)
    }

    getProductLocalStorage = function () {
        if (localStorage.getItem("arrProduct")) {
            let sArrProduct = localStorage.getItem("arrProduct");
            this.arrProduct = JSON.parse(sArrProduct);
        }
    };
    saveProductLocalStorage = function () {
        let sArrProduct = JSON.stringify(this.arrProduct);
        localStorage.setItem("arrProduct", sArrProduct);
    };
    //Check out similar products in the list
    checkSimilarProductInList = function () {
        for (let i = 0; i < this.arrProduct.length; i++) {
            let count = 0;
            let obj1 = this.arrProduct[i];
            count = obj1.countItem;
            for (let j = this.arrProduct.length - 1; j >= i + 1; j--) {
                let obj2 = this.arrProduct[j];
                if (obj1.size === obj2.size && obj1.id === obj2.id) {
                    count += obj2.countItem;
                    this.arrProduct.splice(j, 1);
                }
            }
            this.arrProduct[i].countItem = count
        }
        this.saveProductLocalStorage();
    }
}




// let check= 