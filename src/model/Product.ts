import TradeMark from "./TradeMark";
import ProductTypes from "./ProductTypes";

class Product {
    id: number;
    pType: ProductTypes;
    tradeMark: TradeMark;

    constructor(id: number, pType: ProductTypes, tradeMark: TradeMark) {
        this.id = id;
        this.pType = pType;
        this.tradeMark = tradeMark;
    }
}
export default Product;