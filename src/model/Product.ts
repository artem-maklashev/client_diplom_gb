import TradeMark from "./TradeMark";
import ProductTypes from "./ProductTypes";

class Product {
    id: number;
    ptype: ProductTypes;
    tradeMark: TradeMark;

    constructor(id: number, pType: ProductTypes, tradeMark: TradeMark) {
        this.id = id;
        this.ptype = pType;
        this.tradeMark = tradeMark;
    }
    toString() {
        return this.ptype.name;
    }
}
export default Product;