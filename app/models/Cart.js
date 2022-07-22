export class Cart {
    arrProduct = [];
    total = function () {
        return this.arrProduct.reduce((total, item) => {
            for (let key in item) {
                if (key == 'price') {
                    total += item[key]*item['countItem'];
                }
            }
            return total;
        }, 0)
    }
}