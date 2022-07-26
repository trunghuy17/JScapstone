export class Cart {
    arrProducts = [];
    totalCount=function () {
        return this.arrProducts.reduce((totalCount, item) => {
            for (let key in item) {
                if (key == 'countItem') {
                    totalCount += item['countItem'];
                }
            }
            return totalCount;
        }, 0)
    }
    total = function () {
        return this.arrProducts.reduce((total, item) => {
            for (let key in item) {
                if (key == 'price') {
                    total += item[key] * item['countItem'];
                }
            }
            return total;
        }, 0)
    }

    getProductLocalStorage = function () {
        if (localStorage.getItem("arrProducts")) {
            let sArrProduct = localStorage.getItem("arrProducts");
            this.arrProducts = JSON.parse(sArrProduct);
        }
    };
    saveProductLocalStorage = function () {
        let sArrProduct = JSON.stringify(this.arrProducts);
        localStorage.setItem("arrProducts", sArrProduct);
    };
    //Check out similar products in the list
    checkSimilarProductInList = function () {
        for (let i = 0; i < this.arrProducts.length; i++) {
            let count = 0;
            let obj1 = this.arrProducts[i];
            count = obj1.countItem;
            for (let j = this.arrProducts.length - 1; j >= i + 1; j--) {
                let obj2 = this.arrProducts[j];
                if (obj1.size === obj2.size && obj1.id === obj2.id) {
                    count += obj2.countItem;
                    this.arrProducts.splice(j, 1);
                }
            }
            this.arrProducts[i].countItem = count
        }
        this.saveProductLocalStorage();
    }
}




// let check= 